



### 참고 자료

[[파이썬] Websocket 으로 영상 송수신하기](https://mandloh.tistory.com/7)

(fastAPI가 아닌 `simple_websocket_server` 로 서버 구축) -> html은 참고하고 서버는 fastAPI로 구현해야 할듯

[공식문서-WebSocket, fastAPI](https://fastapi.tiangolo.com/advanced/websockets/)



#### 1. 필요한 모듈 설치

```bash
pip install opencv-python
```

#### 2. 자료들 참고해서 작성한 코드

##### html 코드

```html
<!--videosender.html-->
<!DOCTYPE html>
<html>
<head>
	<title>Hello</title>
</head>
<body>
	<video id="videoInput" style="display:none"></video>
  <canvas id="videoOutput"></canvas>
  <button onclick=stream()>Send</button>
</body>
<script>
  var w = 320, h = 240;
	var url = "ws://localhost:3000"
	var ws = new WebSocket(url);
	ws.onopen = function(){
		console.log("Websocket is connected.");
	}
	ws.onmessage = function(msg){
		console.log(msg.data);
	}

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  var constraints = {audio: false, video: true};
  var video = document.getElementById("videoInput");
  video.width = w;
  video.height = h;
  function successCallback(stream){
  	video.srcObject = stream;
  	video.play();
  }
  
  function errorCallback(error){
   	console.log(error);
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
	var canvas = document.getElementById("videoOutput");
  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext("2d");
  function processImage(){
        ctx.drawImage(video, 0, 0, w, h);
        setTimeout(processImage, 1);
  }
  processImage();

  function stream(){
    setInterval(sendImage, 30);
  }

  function sendImage(){
    var rawData = canvas.toDataURL("image/jpeg", 0.5);
    ws.send(rawData);
  }
</script>
</html>
```

##### python 코드 1 (단순 통신)

```python
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
```

##### python 코드 2 (이미지 처리 통신)

```python
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
                await websocket.send_bytes(bytearray(buffer))  # client 에 메시지 전달
                frame = buffer.tobytes()
            

                fps_time = time.time()
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
            else:
                break

        cap.release()
        
        
        cv2.waitKey(1)
```



#### 3. 분석

- `클라이언트 -> 서버` 웹소켓통신은 실시간으로 됨. 단순 통신은 속도 딜레이 X
- `클라이언트 -> 서버 -> 이미지 분석` 시간 짱많이 걸림, 딜라이가 너무 심함
  - 분석 자체에 시간이 많이 소요됐을 가능성 有
  - 웹소켓에 대한 사전지식이 없는 상태로 코드를 작성해서 최적화를 못했을 가능성 有

- 우선 `클라이언트 -> 서버 -> 이미지 분석 -> 클라이언트` 통신은 성공했음.
- (7/27) 오늘, fps 줄여서 부하를 줄이도록 코드를 작성해볼 것
  - 차근차근 기술조사하면서 꼼꼼하게 최적화하면서 진행하기
  - [fps 조절방법](https://deep-eye.tistory.com/10) 참고해서 fps 조절할 것

- `클라이언트 -> 서버 -> 이미지 분석` setInterver을100ms (FPS:10) 으로 설정하니, 거의 실시간
  - ![image](https://user-images.githubusercontent.com/88833439/181167192-deba05b1-52f3-4ad7-b877-9840aa3e583d.png)