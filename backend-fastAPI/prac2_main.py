# 연의꺼 추가
from requests import get
import json
from fastapi import FastAPI, Header, Request, Response, WebSocket
from pathlib import Path
import base64
import cv2
import sys
import time
import logging
import numpy as np
import pandas as pd
from tf_pose import common
from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
import matplotlib.pyplot as plt
from sklearn.preprocessing import Normalizer
import warnings
from fastapi.responses import StreamingResponse, FileResponse
from tensorflow.python.client import device_lib
import tensorflow as tf
import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "1"  # or even "-1"

print(device_lib.list_local_devices())
if tf.test.gpu_device_name():
    print('GPU found')
else:
    print("No GPU found")

print("==========================================================")


app = FastAPI()


# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     print(f"client connected : {websocket.client}")
#     await websocket.accept() # client의 websocket 접속 허용
#     await websocket.send_text(f"Welcome client : {websocket.client}")
#     camera = cv2.VideoCapture(0,cv2.CAP_DSHOW)

#     while True:
#         success, image = camera.read() # 웹캠 읽어오는 코드 -> while 문안에 있어야 동영상으로 보임
#         if not success:
#             await websocket.send_text(f"WebCame Connect Fail : {websocket.client}")
#             break
#         else :
#             ret, buffer = cv2.imencode('.jpg', image)
#             # frame을 byte로 변경 후 특정 식??으로 변환 후에
#             # yield로 하나씩 넘겨준다.
#             # frame = buffer.tobytes()
#             # yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
#             #    bytearray(buffer) + b'\r\n')

#             # Display the user feed
#             # cv2.imshow('User Window', image_1) # 기존 코드
#             await websocket.send_bytes(bytearray(buffer))  # client 에 메시지 전달


########################################################################################
# 모션인식코드
########################################################################################


warnings.filterwarnings('ignore')

########################################################################################
camera = 0
resize = '432x368'     # resize images before they are processed
resize_out_ratio = 4.0  # resize heatmaps before they are post-processed
model = 'mobilenet_v2_large'
show_process = False
tensorrt = False       # for tensorrt process
########################################################################################
w, h = model_wh(resize)
if w > 0 and h > 0:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(w, h), trt_bool=False)
else:
    e = TfPoseEstimator(get_graph_path(
        model), target_size=(432, 368), trt_bool=False)
print('********* Model Ready *************')
# -> 서버 열리고 한번만 실행하면 됨.


def findCosineSimilarity_1(source_representation, test_representation):
    import numpy as np
    a = np.matmul(np.transpose(source_representation), test_representation)
    b = np.sum(np.multiply(source_representation, source_representation))
    c = np.sum(np.multiply(test_representation, test_representation))
    return 1 - (a / (np.sqrt(b) * np.sqrt(c)))

########################################################################################
#            compare_positions() 함수에 바로 websocket 적용 -> 분리하기
########################################################################################


@app.websocket("/fastAPI/ws/client")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    # 노래 종류 받음
    songId = await websocket.receive_text()
    print(songId)

    while True:
        # 해당 노래의 데이터 읽기
        keyp_list = np.genfromtxt(f'./pose_data/{songId}.csv', delimiter=",")

        dim = (500, 500)
        cnt = -1
        # 노래 끝날 때까지 루프
        while True:
            cnt += 1
            if cnt >= len(keyp_list):
                # cv2.destroyAllWindows()
                await websocket.close()
                break

                # 댄서 영상 스켈레톤 매핑 후 클라이언트한테 전달

            data = await websocket.receive_text()
            print(cnt)

# 댄서 영상 스켈레톤 매핑 후 클라이언트한테 전달
            if (cnt+1<len(keyp_list)):
                dancer_image = np.zeros(dim)
                dancer_image = TfPoseEstimator.sj_draw_humans(dancer_image, keyp_list[cnt+1], imgcopy=False)
                cv2.imshow('Dancer', dancer_image)

                ret, buffer = cv2.imencode('.jpg', dancer_image)
                b_time = time.time()
                print(f'댄서 영상 시간: {b_time-a_time}')
                await websocket.send_bytes(bytearray(buffer))

                        body_part = human.body_parts[i]
                        x_axis = int(body_part.x * image_w + 0.5)
                        y_axis = int(body_part.y * image_h + 0.5)
                        center = [x_axis, y_axis]
                        centers[i] = center
                    k = -2
                    features = [0]*36
                    for j in range(0, 18):
                        k = k+2
                        if(t_keyp_list[cnt][k] == 0 and t_keyp_list[cnt][k+1] == 0):
                            continue
                        try:
                            if k >= 36:
                                break
                            features[k] = centers[j][0]
                            features[k+1] = centers[j][1]
                        except:
                            features[k] = 0
                            features[k+1] = 0


            cnt += 1
            img = cv2.imdecode(np.fromstring(base64.b64decode(
                data.split(',')[1]), np.uint8), cv2.IMREAD_COLOR)
            image_1 = img
            e_d = 0
            # current_time = time.time() - prev_time
            # if img is not None  :
            # resizing the images
            
            # [수정] image_1 = cv2.flip(image_1, 1)
            image_1 = cv2.resize(image_1, dim, interpolation=cv2.INTER_AREA)
            humans_2 = e.inference(image_1, resize_to_default=(
                w > 0 and h > 0), upsample_size=4.0)
            # Dancer keypoints and normalization
            transformer = Normalizer().fit(keyp_list)
            t_keyp_list = transformer.transform(keyp_list)
            # Getting User keypoints, normalization and comparing also plotting the keypoints and lines to the image
            image_1 = TfPoseEstimator.draw_humans(
                image_1, humans_2, imgcopy=False)  # 선 표시하는 코드
            npimg = np.copy(image_1)
            image_h, image_w = npimg.shape[:2]
            centers = {}
            # keypoints_list=[]
            min_ = 0
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
                        features[k] = centers[j][0]
                        features[k+1] = centers[j][1]
                    except:
                        features[k] = 0
                        features[k+1] = 0
                features = transformer.transform([features])
                min_ = 100  # Intializing a value to get minimum cosine similarity score from the dancer array list with the user

                sim_score = findCosineSimilarity_1(t_keyp_list[cnt], features[0])
                # Getting the minimum Cosine Similarity Score
                if min_ > sim_score:
                    min_ = sim_score
            # Displaying the minimum cosine score
            cv2.putText(image_1, str(min_), (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 255), 2)
            # If the disctance is below the threshold
            if min_ < 0.15:
                cv2.putText(image_1, "PERFECT", (120, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            elif min_ < 0.22:
                cv2.putText(image_1, "GREAT", (120, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            else:
                cv2.putText(image_1,  "BAD", (80, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)
            cv2.putText(image_1, "FPS: %f" % (1.0 / (time.time() - prev_time)), (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            ret, buffer = cv2.imencode('.jpg', image_1)

            c_time = time.time()
            print(f'댄서 영상 시간: {c_time-a_time}')

            await websocket.send_text(str(min_))  # client 에 메시지 전달

            frame = buffer.tobytes()
            ret, buffer = cv2.imencode('.jpg', dancer_image)
            await websocket.send_bytes(bytearray(buffer))

            prev_time = time.time()
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            # else:

            # if 1000*(c_time-a_time)<1000:
                # cv2.waitKey(round(1000-1000*(c_time-a_time)))
            
            #     cv2.waitKey(1)

        # cv2.waitKey(1)


some_file_path = "dance_video/soojin.mp4"


@app.get("/game/dancer")
async def main():
    # def iterfile():  #
    #     with open(some_file_path, mode="rb") as file_like:  #
    #         yield from file_like  #

    # return StreamingResponse(iterfile(), media_type="video/mp4")
    return FileResponse(some_file_path)
