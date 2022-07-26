## FastAPI 란 ?

- python 설치 3.6 부터 제공되는 트랜디하고 높은 성능을 가진 파이썬 프레임워크
- 별도의 구성이나 설치의 필요없이 바로 사용 가능
- 가볍고 빠른 프레임워크
- [공식문서](https://fastapi.tiangolo.com/)

### FastAPI 설치

```bash
pip install FastAPI #  FastAPI 설치
pip install uvicorn[standard] # 파이썬 서버 실행기 설치
```

- `uvicorn` : 순수 자바로 이루어진 파이썬 서버 실행기
    - `uvicorn[standard]` : Python 과 C/C++ 로 작성된 uvicorn

### 서버 실행

```bash
uvicorn main:app --reload
```

### img 전송해서 웹 페이지에 띄우기

`compare_positions` 파일 수정

- 화면을 띄우는 기존 코드 (`cv2.imshow('User Window', image_1)` ) 를 대체함.
- `cv2.imencode` 로  이미지 파일로 변환하고 image를 byte 로 변경 후 `yield` 로 하나씩 넘겨준다.

[**main.py](http://main.py) - compare_positions**

```python
# image_1 : 웹캠 이미지
ret, buffer = cv2.imencode('.jpg', image_1)
# image을 byte로 변경 후 특정 식??으로 변환 후에
# yield로 하나씩 넘겨준다.
frame = buffer.tobytes()
yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' +
bytearray(buffer) + b'\r\n')

# 기존 코드
# cv2.imshow('User Window', image_1) 
```

**main.py**

```bash
@app.get("/video")
def main():
    keyp_list=[]; # 데이터 넣어줌
    return StreamingResponse(compare_positions(r'dance_video/dancer.mp4',0,keyp_list), media_type="multipart/x-mixed-replace; boundary=frame")
```

- `StreamingResponse` 를 이용해 반환 하면 웹에 웹캠이 뜸.
- 하지만 html 파일에서 이미지 데이터에 접근하는 방법을 모르겠음

그래서,

<aside>
💡 FastAPI로 프론트까지 구성하여 백과 프론트 사이 웹 소켓 통신 확인하려고 함.

</aside>

### 프론트 구성

- `jinja2` 설치
    - `jinja2` : Python 프레임워크에서 Frontend도 쉽고 빠르게 구축할 수 있도록 지원해줌.
    
    ```bash
    pip install jinja2
    ```
    
    - `templates` 폴더 하위에 생성된 html 파일을 재사용할 수 있음.
    - **html 파일을 지정하고 데이터를 함께 전송할 수 있어서 사용해봄.**
    
    **main.py**
    
    ```python
    from fastapi.responses import HTMLResponse
    from fastapi.templating import Jinja2Templates
    
    templates = Jinja2Templates(directory="templates") # teplates 폴더 지정
    ```
    
    ```python
    @app.get("/index",  response_class=HTMLResponse)
    def index(request: Request):
        return templates.TemplateResponse('index.html', {"request" : request, "data":"데이터 전송")})
    ```
    
    **templates/index.html**
    
    ```bash
    <body>
        {{data}}
    </body>
    ```
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/26e60bef-2a9f-4e39-b465-eadd3a0249cc/Untitled.png)
    

- 웹캠 image 파일 전송
    - 반환 데이터에 이미지 파일을 전송하는 코드를 담아서 확인했으나, 바이너리 값 ? 처럼 보이는 데이터만 화면에 보임 ⇒ **WebSocket** 으로 실시간 통신 필요
    

> **참고할 것**
> 
- 스트리밍 respons
    
    → [https://www.starlette.io/responses/#streamingresponse](https://www.starlette.io/responses/#streamingresponse)
    → [https://stackoverflow.com/questions/65971081/stream-video-to-web-browser-with-fastapi](https://stackoverflow.com/questions/65971081/stream-video-to-web-browser-with-fastapi)
    
- WebSocket 으로 영상 송수신(flask)
→ [https://mandloh.tistory.com/7](https://mandloh.tistory.com/7)
- WebSocket으로 여러 사용자에게 뿌리기
    
    → [https://medium.com/@alexcambose/webcam-live-streaming-with-websockets-and-base64-64b1b4992db8](https://medium.com/@alexcambose/webcam-live-streaming-with-websockets-and-base64-64b1b4992db8)
    

# WebSocket

### **간단한 사용 방법**

1. 웹 소켓을 생성하기 위해 new Socket 호출
    - `ws` 라는 특수 프로토콜을 사용
    
    ```python
    let socket = new Socket("ws://localhost:8000")
    ```
    
    - 이벤트
        1. open - 커넥션이 제대로 만들어졌을 때 발생
        2. message - 데이터를 수신하였을 때 발생
        3. erro - 에러가 생겼을 때 발생
        4. close - 커넥션이 종료되었을 때 발생
2. 메세지 전송
    
    ```python
    socket.send(data)
    ```
    
    전체 코드
    
    ```jsx
    let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");
    
    socket.onopen = function(e) {
      alert("[open] 커넥션이 만들어졌습니다.");
      alert("데이터를 서버에 전송해봅시다.");
      socket.send("My name is Bora");
    };
    
    socket.onmessage = function(event) {
      alert(`[message] 서버로부터 전송받은 데이터: ${event.data}`);
    };
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`);
      } else {
        // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
        // event.code가 1006이 됩니다.
        alert('[close] 커넥션이 죽었습니다.');
      }
    };
    
    socket.onerror = function(error) {
      alert(`[error] ${error.message}`);
    };
    ```
    

### 웹소켓 핸드셰이크

- new WebSocket(url)을 호출해 소켓을 생성하면 즉시 연결된다.
- 커넥션이 유지되는 동안 브라우저는 서버에 웹소켓을 지원하는지 묻는다.
- 서버가 맞다고 응답을 하면 서버 - 브라우저간 HTTP 통신이 아닌 WebSocket으로 통신을 한다.

### 데이터 전송

- 웹소켓 통신은 ‘프레임(Frame)’이라고 불리는 데이터 조각을 사용해 이루어진다.
- 프레임은 서버와 클라이언트 양측 모두에서 보낼 수 있다
- 종류
    - Text Frame
    - Binary data Frame
    - Ping/Pong Frame
    - Connection close Frame
    - 등등

❗**WebSocket.send() 는 Text나 Binary 데이터만 전송 가능**

1. 데이터를 보낼 때,
    - socket.send(body) 를 호출할 때, Body에는 문자열이나 Blob, ArrayBuffere 등의 이진 데이터만 들어갈 수 있다. 데이터 종류에 따라 따로 세팅할 필요는 없고 알아서 데이터다 전송된다.
2. 데이터를 받을 때,
    - 텍스트 데이터는 항상 문자열 형태로 온다.
    - 이진 데이터는 Blob이나 ArrayBuffer 둘 중 하나를 고를 수 있다.
        - socket.binaryType 프로퍼티를 사용시. 기본값은 Blob 객체
        - Blob은 `<a>` 나 `<img>` 태그와 바로 통합할 수 있다.
        - arraybuffer는 개별 데이터 바이트에 접근해야하는 경우 적합하다.
        
        ```jsx
        socket.binaryType = "arraybuffer";
        socket.onmessage = (event) => {
          // event.data는 (텍스트인 경우) 문자열이거나 (이진 데이터인 경우) arraybuffer 입니다.
        };
        ```
        
### 속도 제한

- 많은 데이터를 전송해야하는데 사용자의 네트워크 속도가 느릴 수도 있다.
- socket.send(data)를 반복하면 데이터는 버퍼에 쌓이게 된고 네트워크 속도가 빨라질 때 전송된다.
- `socket.bufferedAmount` 는 이 순간 버퍼링되어 전송 되기를 기다리는 바이트수를 저장한다.
- 소켓이 실제로 정송에 사용 가능한지 여부를 확인하기 위해 검사할 수 있다.

```jsx
// every 100ms examine the socket and send more data
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```

### 연결 닫기

- connection close Frame을 전송한다.
    - `code` 특별한 WebSocket 종료 코드(선택 사항)
    - `reason` 닫는 이유를 설명하는 문자열(선택 사항)

```jsx
socket.close([code], [reason]);
```

> 출처 - [https://ko.javascript.info/websocket](https://ko.javascript.info/websocket)
> 

# WebSocket으로 웹캠 이미지 전송 (FastAPI→Front)

- 일단 모델을 적용하기 전에 소켓을 이용해 웹캠 이미지를 html에 띄어보겠다

**index.html**

```jsx
		<img id="video" src="">
    <script>
        var w = 320, h = 240;
        var url = "ws://localhost:8000/motion"
        var ws = new WebSocket(url);
        ws.binaryType = "arraybuffer"; 
        ws.onopen = function(){
            console.log("Web Socket is connected.");
        }
        ws.onmessage = function(msg){
            console.log(msg.data);
            var arrayBufferView = new Uint8Array( msg.data);
            var blob = new Blob( [ arrayBufferView ], { type: "multipart/x-mixed-replace" } );
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL( blob );
            var img = document.querySelector( "#video" );
            img.src = imageUrl;
        }
        ws.onclose = function(){
            console.log("connection close");
        }
    </script>
```

- `ws.binaryType = "arraybuffer";`
    - server에서 arraybuffer 로 이미지 데이터를 전송하고 있으므로 binaryType을 arraybuffer 로 설정한다.
- `var arrayBufferView = new Uint8Array( msg.data);
 var blob = new Blob( [ arrayBufferView ], { type: "multipart/x-mixed-replace" } );`
    - blob 객체 생성
- ⚠️ 코드 분석 필요

**main.py**

```python
from fastapi import FastAPI, WebSocket

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    print(f"client connected : {websocket.client}")
    await websocket.accept() # client의 websocket 접속 허용
    await websocket.send_text(f"Welcome client : {websocket.client}") # text 전송

    camera = cv2.VideoCapture(0,cv2.CAP_DSHOW)
   
    while True:
				# 웹캠 읽어오는 코드 -> while 문안에 있어야 동영상으로 보임
        success, image = camera.read() 
        if not success:
            await websocket.send_text(f"WebCame Connect Fail : {websocket.client}")
            break
        else :
						# 이미지 인코딩 retval : 압축 결과(True/False), buffer :인코딩된 이미지
            retval, buffer = cv2.imencode('.jpg', image) 
            await websocket.send_bytes(bytearray(buffer))  # client 에 메시지 전달
```

위 코드를 `compare_positions` 에 적용 (main.py 참고)


# 정리

- FastAPI 와 WebSocket 을 이용해 프론트로 이미지 파일 실시간 전송을 구현했다.
- 웹소켓은 text 와 binary 파일만 전송된다고 한다.    
하나의 통신으로 바이너리 데이터를 포함한 여러 데이터를 JSON 형식으로 보내는 것이 가능한지 알아봐야한다.
- 주고 받는 데이터가    
`강사영상`, `회원영상`, `결과` 이렇게 3개라서    
회원 영상은 프론트에서 웹캠 이미지 바로 띄워주고    
강사 영상을 서버에 보내는 소켓 통신과    
결과를 보내는 소켓 통신 이렇게 2개를 이용해야할 것 같다.