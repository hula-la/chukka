import json
from fastapi import FastAPI, Header, Request, Response, WebSocket
import base64, cv2
app = FastAPI()


import cv2

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print(f"client connected : {websocket.client}")
    await websocket.accept() # client의 websocket 접속 허용
    await websocket.send_text(f"Welcome client : {websocket.client}")
    camera = cv2.VideoCapture(0,cv2.CAP_DSHOW)
    
    while True:
        success, image = camera.read() # 웹캠 읽어오는 코드 -> while 문안에 있어야 동영상으로 보임
        if not success:
            await websocket.send_text(f"WebCame Connect Fail : {websocket.client}")
            break
        else :
            ret, buffer = cv2.imencode('.jpg', image)
            # frame을 byte로 변경 후 특정 식??으로 변환 후에
            # yield로 하나씩 넘겨준다.
            # frame = buffer.tobytes()
            # yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
            #    bytearray(buffer) + b'\r\n')

            # Display the user feed
            # cv2.imshow('User Window', image_1) # 기존 코드
            await websocket.send_bytes(bytearray(buffer))  # client 에 메시지 전달


########################################################################################
# 모션인식코드
########################################################################################

import sys
import time
import logging
import numpy as np
import cv2
import tensorflow as tf

from tf_pose import common
from tf_pose.estimator import TfPoseEstimator
from tf_pose.networks import get_graph_path, model_wh
import matplotlib.pyplot as plt
from sklearn.preprocessing import Normalizer
import warnings
warnings.filterwarnings('ignore')

########################################################################################
camera = 0
resize = '432x368'     # resize images before they are processed
resize_out_ratio = 4.0 # resize heatmaps before they are post-processed
model='mobilenet_v2_large'
show_process = False
tensorrt = False       # for tensorrt process
########################################################################################
w, h = model_wh(resize)
if w > 0 and h > 0:
    e = TfPoseEstimator(get_graph_path(model), target_size=(w, h), trt_bool=False)
else:
    e = TfPoseEstimator(get_graph_path(model), target_size=(432, 368), trt_bool=False)
print('********* Model Ready *************')
######################################################################################## -> 서버 열리고 한번만 실행하면 됨.

def dance_video_processing(video_path= r'dance_video/dancer.mp4',showBG = True):
    
    cap = cv2.VideoCapture(video_path)
    if cap.isOpened() is False:
        print("Error opening video stream or file")
    fps_time = 0
    while True:
        ret_val, image = cap.read()
        dim = (368, 428)
        if ret_val:
             # resize image
            image = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
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
            keypoints_list=[]
            for human in humans:
                      # draw point
                    for i in range(common.CocoPart.Background.value):
                            if i not in human.body_parts.keys():
                                    continue
                            body_part = human.body_parts[i]
                            x_axis=int(body_part.x * image_w + 0.5)
                            y_axis=int(body_part.y * image_h + 0.5) 
                            center=[x_axis,y_axis]
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
    #print(keypoints_list)
    cap.release()
    cv2.destroyAllWindows()
    return keypoints_list

def get_position(video_path= r'dance_video/dancer.mp4',showBG = True):
    keypoints_list=dance_video_processing()
    import pandas as pd
    #features=[0]*32
    features=[0]*36
    #print(features)
    keyp_list=[]
    #data=pd.Dataframe()
    #print(len(keypoints_list[i]))
    # Preprocessing of the keypoints data
    for i in range(0, len(keypoints_list)):
        k=-2
        for j in range(0,18):
            k=k+2
            try:
                if k>=36:
                    break
                #print(k)
                #print(keypoints_list[i][j])
                features[k]=keypoints_list[i][j][0]
                features[k+1]=keypoints_list[i][j][1]
            except:
                features[k]=0
                features[k+1]=0
        #print(features)
        keyp_list.append(features)
    #print(keyp_list)
    # Getting all the feature column names for intialization of our dataframe.
    column_names=[]
    for i in range(36):
        column_names.append(str(i))
    data=pd.DataFrame(keyp_list,columns=column_names)
    return data,keyp_list

def findCosineSimilarity_1(source_representation, test_representation):
    import numpy as np
    a = np.matmul(np.transpose(source_representation), test_representation)
    b = np.sum(np.multiply(source_representation, source_representation))
    c = np.sum(np.multiply(test_representation, test_representation))
    return 1 - (a / (np.sqrt(b) * np.sqrt(c)))

########################################################################################
#            compare_positions() 함수에 바로 websocket 적용 -> 분리하기
########################################################################################

@app.websocket("/motion")
async def compare_positions(websocket: WebSocket):
    await websocket.accept() # client의 websocket 접속 허용
    await websocket.send_text(f"Welcome client : {websocket.client}")
    ########################### 파라미터로 받았던 값 ##################################
    trainer_video = r'dance_video/dancer.mp4'
    keyp_list=[
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74]]
    dim=(420,720)
    ########################################################################################
    cap = cv2.VideoCapture(trainer_video)
    cam = cv2.VideoCapture(0,cv2.CAP_DSHOW) 
    cam.set(3, w)
    cam.set(4, h)
    fps_time = 0 #Initializing fps to 0
    while True:
        ret_val, image_1 = cam.read()
        e_d=0
        ret_val_1,image_2 = cap.read()
        if not ret_val:
            await websocket.send_text(f"WebCame Connect Fail : {websocket.client}")
            break
        if ret_val_1 and ret_val:
            # resizing the images
            image_2 = cv2.resize(image_2, dim, interpolation = cv2.INTER_AREA)
            image_1 = cv2.resize(image_1, dim, interpolation = cv2.INTER_AREA)
            dancers_1=e.inference(image_2,resize_to_default=(w > 0 and h > 0),upsample_size=4.0)
            humans_2 = e.inference(image_1, resize_to_default=(w > 0 and h > 0),upsample_size=4.0 )
            #Dancer keypoints and normalization
            transformer = Normalizer().fit(keyp_list)  
            keyp_list=transformer.transform(keyp_list)
            # Showing FPS
            cv2.putText(image_2, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            # Displaying the dancer feed.
            cv2.imshow('Dancer Window', image_2)
            # Getting User keypoints, normalization and comparing also plotting the keypoints and lines to the image
            image_1 = TfPoseEstimator.draw_humans(image_1, humans_2, imgcopy=False) # 선 표시하는 코드
            npimg = np.copy(image_1)
            image_h, image_w = npimg.shape[:2]
            centers = {}
            keypoints_list=[]
            min_=0
            for human in humans_2:
                          # draw point
                    for i in range(common.CocoPart.Background.value):
                                if i not in human.body_parts.keys():
                                        continue

                                body_part = human.body_parts[i]
                                x_axis=int(body_part.x * image_w + 0.5)
                                y_axis=int(body_part.y * image_h + 0.5)
                                center=[x_axis,y_axis]
                                centers[i] = center
                    k=-2
                    features=[0]*36
                    for j in range(0,18):
                        k=k+2
                        try:
                            if k>=36:
                                break
                            #print(k)
                            #print(keypoints_list[i][j])
                            features[k]=centers[j][0]
                            features[k+1]=centers[j][1]
                        except:
                            features[k]=0
                            features[k+1]=0
                    features=transformer.transform([features])
                    #print(features[0])
                    min_=100 # Intializing a value to get minimum cosine similarity score from the dancer array list with the user
                    for j in keyp_list:
                        #print(j)
                        sim_score=findCosineSimilarity_1(j,features[0])
                        #print(sim_score)
                        #Getting the minimum Cosine Similarity Score
                        if min_>sim_score:
                            min_=sim_score
            # Displaying the minimum cosine score
            cv2.putText(image_1, str(min_), (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
            # If the disctance is below the threshold
            if min_<0.15:
                cv2.putText(image_1, "CORRECT STEPS", (120, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            else:
                cv2.putText(image_1,  "NOT CORRECT STEPS", (80, 700),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            cv2.putText(image_1, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            # image_1 : 웹캠 이미지
            ret, buffer = cv2.imencode('.jpg', image_1)
            await websocket.send_bytes(bytearray(buffer))  # client 에 메시지 전달
            frame = buffer.tobytes()
            # yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
            #    bytearray(buffer) + b'\r\n')

            # Display the user feed
            # cv2.imshow('User Window', image_1) # 기존 코드
           

            fps_time = time.time()
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        else:
            break

    cam.release()
    cap.release()
    cv2.destroyAllWindows()


########################################################################################
#                                  안 쓰는 코드 
########################################################################################

from fastapi.responses import StreamingResponse

def get_stream_video():
    # camera 정의
    cam = cv2.VideoCapture(0)

    while True:
        # 카메라 값 불러오기
        success, frame = cam.read()

        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            # frame을 byte로 변경 후 특정 식??으로 변환 후에
            # yield로 하나씩 넘겨준다.
            frame = buffer.tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
               bytearray(frame) + b'\r\n')

def video_streaming():
    return get_stream_video()
    

@app.get("/video")
def main():
    keyp_list=[
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
        [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74]]
    return StreamingResponse(compare_positions(r'dance_video/dancer.mp4',0,keyp_list), media_type="multipart/x-mixed-replace; boundary=frame")


def generate_frames(cap,i):
    while True:
        success,frame = cap.read()
        if not success:
            break
        else:
            # Reshape image
            im_arr = cv2.imencode('.jpg', frame)[1]
            cv2.waitKey(50)
            i = i + 1
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + bytearray(im_arr) + b'\r\n')

@app.get("/video_normal")
def main():
    i = 0
    cap = cv2.VideoCapture(0,cv2.CAP_DSHOW)
    return StreamingResponse(generate_frames(cap,i), media_type = 'multipart/x-mixed-replace; boundary=frame')
    

@app.websocket("/client")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:

        trainer_video = r'dance_video/dancer.mp4'
        keyp_list=[
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74],
            [199 , 79 , 199 , 107 , 165 , 107,  145,  133 , 121,  135,  232 , 109  ,264 , 137 , 305 , 172  ,175 , 195 , 147  ,228 ,  0  , 0  ,216 , 193  ,223  ,244 , 256 , 305  ,191 , 72 , 206 , 72 , 177,  74 , 218,  74]]
        dim=(420,720)
        ########################################################################################
        cap = cv2.VideoCapture(trainer_video)

        fps_time = 0 #Initializing fps to 0
        while True:
            data = await websocket.receive_text()
            img = cv2.imdecode(np.fromstring(base64.b64decode(data.split(',')[1]), np.uint8), cv2.IMREAD_COLOR)
            image_1 = img
            e_d=0
            ret_val_1,image_2 = cap.read()
            if ret_val_1:
                # resizing the images
                image_2 = cv2.resize(image_2, dim, interpolation = cv2.INTER_AREA)
                image_1 = cv2.resize(image_1, dim, interpolation = cv2.INTER_AREA)
                dancers_1=e.inference(image_2,resize_to_default=(w > 0 and h > 0),upsample_size=4.0)
                humans_2 = e.inference(image_1, resize_to_default=(w > 0 and h > 0),upsample_size=4.0 )
                #Dancer keypoints and normalization
                transformer = Normalizer().fit(keyp_list)  
                keyp_list=transformer.transform(keyp_list)
                # Showing FPS
                cv2.putText(image_2, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                # Getting User keypoints, normalization and comparing also plotting the keypoints and lines to the image
                image_1 = TfPoseEstimator.draw_humans(image_1, humans_2, imgcopy=False) # 선 표시하는 코드
                npimg = np.copy(image_1)
                image_h, image_w = npimg.shape[:2]
                centers = {}
                keypoints_list=[]
                min_=0
                for human in humans_2:
                            # draw point
                        for i in range(common.CocoPart.Background.value):
                                    if i not in human.body_parts.keys():
                                            continue

                                    body_part = human.body_parts[i]
                                    x_axis=int(body_part.x * image_w + 0.5)
                                    y_axis=int(body_part.y * image_h + 0.5)
                                    center=[x_axis,y_axis]
                                    centers[i] = center
                        k=-2
                        features=[0]*36
                        for j in range(0,18):
                            k=k+2
                            try:
                                if k>=36:
                                    break
                                features[k]=centers[j][0]
                                features[k+1]=centers[j][1]
                            except:
                                features[k]=0
                                features[k+1]=0
                        features=transformer.transform([features])
                        min_=100 # Intializing a value to get minimum cosine similarity score from the dancer array list with the user
                        for j in keyp_list:
                            sim_score=findCosineSimilarity_1(j,features[0])
                            #Getting the minimum Cosine Similarity Score
                            if min_>sim_score:
                                min_=sim_score
                # Displaying the minimum cosine score
                cv2.putText(image_1, str(min_), (10, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                # If the disctance is below the threshold
                if min_<0.15:
                    cv2.putText(image_1, "CORRECT STEPS", (120, 700),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                else:
                    cv2.putText(image_1,  "NOT CORRECT STEPS", (80, 700),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                cv2.putText(image_1, "FPS: %f" % (1.0 / (time.time() - fps_time)), (10, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

                ret, buffer = cv2.imencode('.jpg', image_1)


                cli_str = bytearray(buffer)



                # await websocket.send_json(json.dumps({
                #     "client":base64.urlsafe_b64encode(cli_str).decode('utf8'),
                #     "dancer":base64.urlsafe_b64encode(dan_str).decode('utf8'),
                #     }))
                await websocket.send_text(cli_str)
                # await websocket.send_bytes()  # client 에 메시지 전달
                frame = buffer.tobytes()
            

                fps_time = time.time()
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            else:
                break

        cap.release()
        
        
        cv2.waitKey(1)



from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="templates")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.htm", context={"request": request})


@app.get("/game/dancer")
async def dancer_video(range: str = Header(None)):
    trainer_video = r'dance_video/dancer.mp4'
    CHUNK_SIZE = 1024*1024

    start, end = range.replace("bytes=", "").split("-")
    start = int(start)
    end = int(end) if end else start + CHUNK_SIZE
    with open(trainer_video, "rb") as video:
        video.seek(start)
        data = video.read(end - start)
        filesize = str(trainer_video.stat().st_size)
        headers = {
            'Content-Range': f'bytes {str(start)}-{str(end)}/{filesize}',
            'Accept-Ranges': 'bytes'
        }
        return Response(data, status_code=206, headers=headers, media_type="video/mp4")


