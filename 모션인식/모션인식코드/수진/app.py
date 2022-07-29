from flask import Flask, Response  # 간단히 플라스크 서버를 만든다

import urllib.request


import sys
import time
import logging
import numpy as np
import cv2

import numpy as np
from tf_pose import common
from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
import matplotlib.pyplot as plt
from sklearn.preprocessing import Normalizer
import warnings
warnings.filterwarnings('ignore')

camera = 0
resize = '432x368'     # resize images before they are processed
resize_out_ratio = 4.0  # resize heatmaps before they are post-processed
model = 'mobilenet_v2_large'
show_process = False
tensorrt = False       # for tensorrt process

w, h = model_wh(resize)
if w > 0 and h > 0:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(w, h), trt_bool=False)
else:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(432, 368), trt_bool=False)
print('********* Model Ready *************')


def findCosineSimilarity_1(source_representation, test_representation):
    import numpy as np
    a = np.matmul(np.transpose(source_representation), test_representation)
    b = np.sum(np.multiply(source_representation, source_representation))
    c = np.sum(np.multiply(test_representation, test_representation))
    return 1 - (a / (np.sqrt(b) * np.sqrt(c)))


def gen_frames(trainer_video, user_video, keyp_list):
    ret, buffer, ret2, buffer2 = compare_positions(
        trainer_video, user_video, keyp_list)
    frame = buffer.tobytes()
    frame2 = buffer2.tobytes()
    yield (b'--frame\r\n'
           b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'+frame2)  # concat frame one by one and show result


def compare_positions(trainer_video, user_video, keyp_list, dim=(420, 720)):
    cap = cv2.VideoCapture(trainer_video)
    cam = cv2.VideoCapture(user_video)
    cam.set(3, w)
    cam.set(4, h)
    fps_time = 0  # Initializing fps to 0
    while True:
        ret_val, image_1 = cam.read()
        e_d = 0
        ret_val_1, image_2 = cap.read()
        min_ = 0
        if ret_val_1 and ret_val:
            # resizing the images
            image_2 = cv2.resize(image_2, dim, interpolation=cv2.INTER_AREA)
            image_1 = cv2.resize(image_1, dim, interpolation=cv2.INTER_AREA)
            dancers_1 = e.inference(image_2, resize_to_default=(
                w > 0 and h > 0), upsample_size=4.0)
            humans_2 = e.inference(image_1, resize_to_default=(
                w > 0 and h > 0), upsample_size=4.0)
            # Dancer keypoints and normalization
            transformer = Normalizer().fit(keyp_list)
            keyp_list = transformer.transform(keyp_list)
            # Showing FPS
            cv2.putText(image_2, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            # Displaying the dancer feed.
            # cv2.imshow('Dancer Window', image_2)
            # Getting User keypoints, normalization and comparing also plotting the keypoints and lines to the image
            image_1 = TfPoseEstimator.draw_humans(
                image_1, humans_2, imgcopy=False)
            npimg = np.copy(image_1)
            image_h, image_w = npimg.shape[:2]
            centers = {}
            keypoints_list = []
            for human in humans_2:
                # draw point
                for i in range(common.CocoPart.Background.value):
                    if i not in human.body_parts.keys():
                        continue

                    body_part = human.body_parts[i]
                    x_axis = int(body_part.x * image_w + 0.5)
                    y_axis = int(body_part.y * image_h + 0.5)
                    center = [x_axis, y_axis]
                    centers[i] = center
                k = -2
                features = [0]*36
                for j in range(0, 18):
                    k = k+2
                    try:
                        if k >= 36:
                            break
                        # print(k)
                        # print(keypoints_list[i][j])
                        features[k] = centers[j][0]
                        features[k+1] = centers[j][1]
                    except:
                        features[k] = 0
                        features[k+1] = 0
                features = transformer.transform([features])
                # print(features[0])
                min_ = 100  # Intializing a value to get minimum cosine similarity score from the dancer array list with the user
                for j in keyp_list:
                    # print(j)
                    sim_score = findCosineSimilarity_1(j, features[0])
                    # print(sim_score)
                    # Getting the minimum Cosine Similarity Score
                    if min_ > sim_score:
                        min_ = sim_score
            # Displaying the minimum cosine score
            cv2.putText(image_1, str(min_), (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            # If the disctance is below the threshold
            if min_ < 0.15:
                cv2.putText(image_1, "CORRECT STEPS", (120, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            else:
                cv2.putText(image_1,  "NOT CORRECT STEPS", (80, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            cv2.putText(image_1, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            # Display the user feed
            # cv2.imshow('User Window', image_1)

            fps_time = time.time()
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            break

    cam.release()
    cap.release()
    # cv2.destroyAllWindows()
    return [cv2.imencode('.jpg', image_1), cv2.imencode('.jpg', image_2)]


def dance_video_processing(video_path=r'dance_video/dancer.mp4', showBG=True):
    cap = cv2.VideoCapture(video_path)
    if cap.isOpened() is False:
        print("Error opening video stream or file")
    fps_time = 0
    while True:
        ret_val, image = cap.read()
        dim = (368, 428)
        if ret_val:
            # resize image
            image = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
            humans = e.inference(image,
                                 resize_to_default=(w > 0 and h > 0),
                                 upsample_size=4.0)
            if not showBG:
                image = np.zeros(image.shape)
            # Plotting the keypoints and lines to the image
            image = TfPoseEstimator.draw_humans(image, humans, imgcopy=False)
            npimg = np.copy(image)
            image_h, image_w = npimg.shape[:2]
            centers = {}
            keypoints_list = []
            for human in humans:
                # draw point
                for i in range(common.CocoPart.Background.value):
                    if i not in human.body_parts.keys():
                        continue

                    body_part = human.body_parts[i]
                    x_axis = int(body_part.x * image_w + 0.5)
                    y_axis = int(body_part.y * image_h + 0.5)
                    center = [x_axis, y_axis]
                    centers[i] = center
                    keypoints_list.append(centers)
            # To display fps
            cv2.putText(image, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            # To display image
            cv2.imshow('Dancer', image)
            fps_time = time.time()
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        else:
            break
    # print(keypoints_list)
    cap.release()
    cv2.destroyAllWindows()
    return keypoints_list


def get_position(video_path=r'dance_video/dancer.mp4', showBG=True):
    keypoints_list = dance_video_processing()
    import pandas as pd
    # features=[0]*32
    features = [0]*36
    # print(features)
    keyp_list = []
    # data=pd.Dataframe()
    # print(len(keypoints_list[i]))
    # Preprocessing of the keypoints data
    for i in range(0, len(keypoints_list)):
        k = -2
        for j in range(0, 18):
            k = k+2
            try:
                if k >= 36:
                    break
                # print(k)
                # print(keypoints_list[i][j])
                features[k] = keypoints_list[i][j][0]
                features[k+1] = keypoints_list[i][j][1]
            except:
                features[k] = 0
                features[k+1] = 0
        # print(features)
        keyp_list.append(features)
    # print(keyp_list)
    # Getting all the feature column names for intialization of our dataframe.
    column_names = []
    for i in range(36):
        column_names.append(str(i))
    data = pd.DataFrame(keyp_list, columns=column_names)
    return data, keyp_list


app = Flask(__name__)
data, keyp_list = get_position()
data.head()


@app.route('/video_feed')
def index():
    global keyp_list
    return Response(gen_frames(r'dance_video/dancer.mp4', 0, keyp_list), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index2():
    return "da"


# if __name__ == '__main__':
#     app.run(debug=False,host="127.0.0.1",port=5000)


if __name__ == "__main__":
    # data, keyp_list = get_position()
    # data.head()
    # app.run(debug=True)
    app.run(debug=False, host="127.0.0.1", port=5000)
