### FastAPI

##### 기본 사용 방법

1. `pip install FastAPI`

2. `pip install "uvicorn[standard]"`

3. 파이썬 코드

   ```python
   from fastapi import FASTAPI
   app = FastAPI()
   ```

4. 메인페이지 접속시 'hello' 보내기

   ```python
   @app.get("/")
   def 작명():
       return 'hello'
   ```

5. `uvicorn main:app --reload`



- `/docs` 접속시 API 문서 자동으로 만들어줌
  - 서버 기능을 문서화해서 정리해줌
  - `/redoc`이라고 하면 다른 형태로 정리해줌



##### 메인페이지 접속시 html 파일 전송

1. `index.html` 파일 작성

2. 파이썬 코드

   ```python
   from fastapi.responses import FileResponse
   
   @app.get("/")
   def 작명():
       return FileResponse('index.html')
   ```

   

##### 유저에게 데이터 받기

1. 모델 생성

   ```python
   from pydantic import BaseModel
   class 작명(BaseModel):
       name :str
       phone :int
       
   @app.post("/send")
   def 작명(data : Model):
       return '전송완료'
   ```

   

- async/await 키워드로 비동기처리 가능