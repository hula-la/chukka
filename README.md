# CHUKKA (춤을 배우고 즐기고 소통할 수 있는 춤 플랫폼)

📆 **프로젝트 진행기간 : 2022/07/18 ~ 2022/08/19**

🤠 **FE: 윤호준, 홍성목**

😼 **BE: 김수진(팀장), 김대영, 이연의, 최지원**

📽 **[프로젝트 UCC 영상 보러가기](https://youtu.be/H0XNpBY4OPg)**

![image](https://user-images.githubusercontent.com/88833439/201501275-945ea0ec-a36d-4830-884c-67bd65d94c47.png)



## 👭 소개

### 춤을 좋아하지만 몸이 따라주지 않는 '뚝딱이'들을 위한, 춤 플랫폼 <CHUKKA\>

#### 추까 (CHUKKA) 프로젝트는 

#### 춤을 실시간/강의로 배울 수 있는 배움 서비스,

#### 즐기면서 춤 실력을 확인할 수 있는 게임 서비스,

#### 짧은 춤 영상으로 사람들과 소통할 수 있는 숏폼 서비스를 제공합니다.



## 🔎 CHUKKA 서비스 화면

### 강의 페이지

[저작권 보호를 위해 템플릿 이미지는 직접 만든 이미지로 대체했습니다]

- **강의 목록**

  ![image](https://user-images.githubusercontent.com/88833439/201503564-f56b0d6d-dd1c-4c77-9f1c-30938e74458b.png)

- **강의 상세**

  ![image](https://user-images.githubusercontent.com/88833439/201503580-3e266501-6f37-463f-8319-2b2070ce5f6a.png)

- **라이브 강의** : WebRTC 기술을 통해서 강사 화면과 자신의 화면을 비교하며 춤을 배울 수 있습니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503873-f99ef8a3-8e8a-40da-9efb-6c5b182d9624.png)

- **녹화 강의**: 녹화 강의를 들을 수 있고, 사용자의 카메라를 on/off 하며 춤을 배울 수 있습니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503883-0dbaf1b7-0c97-4fc4-95be-327693c19bb5.png)

---

### 게임 페이지

- **시작 화면**

  ![image](https://user-images.githubusercontent.com/88833439/201503664-91f428d2-ea4f-4530-85fc-abd940692368.png)

- **게임 플레이**: 중간의 정답 영상과 사용자의 동작을 비교하여, 점수가 책정됩니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503672-bc80c250-6aab-42ac-a843-8d666d2e1425.png)

---

### 스낵스 페이지

- **스낵스 목록**: 다른 회원들의 스낵스 (짧은 동영상) 들을 볼 수 있으며, 일주일 동안 가장 많이 업로드 된 해시태그들을 볼 수 있습니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503707-9d9b3db0-aaf0-40fb-ae1b-2c7d4f2a1b8a.png)

- **스낵스 등록**: 원하는 노래로 배경 음악으로 설정하여 영상을 녹화 및 업로드를 할 수 있고, 미리 녹화된 영상을 업로드할 수 있습니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503748-3921a940-0365-44e7-a9f4-ad433eb81ce6.png)

---

### 마이페이지

- 자신의 프로필을 볼 수 있으며, 강의/게임/스낵스를 통해 얻은 경험치를 매달의 형태로 볼 수 있습니다.![image](https://user-images.githubusercontent.com/88833439/201503773-f363e215-326b-483c-bde7-562f2a92f21c.png)

### 관리자페이지

- 회원 관리, 강사 관리, 강의 관리를 할 수 있습니다.

  ![image](https://user-images.githubusercontent.com/88833439/201503788-8e4a7bae-5959-4868-88d2-a1e3d6aa7f02.png)

 　

## ⚙️ 개발 환경

- **OS**

  - Windows 10

- **Front**

  - HTML5, CSS3, JavaScript(ES6)
  - Node.js 16.16.0
  - React 17.0.2

- **Back**

  - Spring Boot 2.7.2
  - Spring Framework 5.3.22
  - Python 3.7
  - FastAPI 0.79
  - jdk 1.8

- **DB**

  - MySQL 8.0.29

- **WebRTc**

  - openVidu

- **IDE**

  - vscode 1.70
  - IntelliJ 2022.1.3

- ##### CI/CD

  - Amazon EC2 - Ubuntu 20.04
  - Nginx - 1.18.0

- **협업도구**

  - Git, Jira, Notion

　

## 🧩 서비스 아키텍처

![image](https://user-images.githubusercontent.com/88833439/201501549-9a01852f-bd47-406e-9172-8b8a3f243e39.png)

　

## 🌈 기술 특이점

- 코사인 유사도 및 tensorFlow를 이용한 자세 유사도 계산 오픈소스를 활용한 게임 서비스 제작
- 실시간 동작 측정을 위한 웹소켓 통신 & 정확도 개선을 위한 영상의 FPS 전처리 및 웹소켓 동기화
- WebRTC를 이용한 실시간 강의 서비스

　

# 📄 Manual

### 1. 깃 클론

<aside>
💡 git에 있는 프로젝트의 source code를 클론받습니다
</aside>


```bash
# git clone
$ git clone https://github.com/hula-la/chukka.git
$ cd chukka
```

### 2. 설치

<aside>
💡 프로젝트 실행을 위해 개발 환경을 구축합니다.
</aside>


1. **Node.js 16.16.0**

2. **jdk 1.8**

3.  **Python 3.7**

   

### 3. 백엔드 빌드

```bash
# 1. 디렉토리 이동
$ cd backend-java/
# 2. 아래의 application-hide.yml 양식 참고해서 추가
# 3. 빌드
$ ./gradlew build
$ java -jar build/libs/ssafy-web-project-1.0-SNAPSHOT.jar
```

- src/resources 에 `application-hide.yml` 생성 (`**`인 부분 채워서)

```yml
spring:
  servlet:
    multipart:
      max-file-size: 50MB
      max-request-size: 50MB
  mail:
    host: smtp.naver.com
    port: 465
    username: **********
    password: ****
    properties:
      mail.smtp.auth: true
      mail.smtp.ssl.enable: true
      mail.smtp.ssl.trust: smtp.naver.com
  jpa:
    hibernate:
      naming:
        implicit-strategy: org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy
        physical-strategy: org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL57Dialect
        format_sql: true
    show-sql: false
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      password: ******
      username: ******
    url: jdbc:mysql://localhost:3306/***?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
  data:
    web:
      pageable:
        one-indexed-parameters: 'true'
  mvc:
    throw-exception-if-no-handler-found: 'true'
  devtools:
    livereload:
      enabled: 'true'
  resources:
    static-locations: classpath:/dist/
    add-mappings: 'false'
cloud:
  aws:
    s3:
      bucket: *****
    stack:
      auto: false
    region:
      static: ap-northeast-2
    credentials:
      access-key: ********
      secret-key: ************
      instanceProfile: true
```



### 4. 프론트엔드 빌드

💡 다운받은 source code 로 build 폴더를 생성합니다.

```bash
# 1. 디렉토리 이동
$ cd frontend/

# 2. 라이브러리 설치
$ npm i

# 3. 아래의 .env 파일 양식 참고해서 추가
# 4. 실행
$ npm build
```

- /frontend/ 하위에 **`.env`** 파일 생성

  ```bash
  # .env
  REACT_APP_S3_URL_DANCE = 'https://***.s3.ap-northeast-2.amazonaws.com'
  REACT_APP_S3_URL_CHUKKA = 'https://***.s3.ap-northeast-2.amazonaws.com'
  ```



### 5. FastAPI 빌드

- 가상 환경 생성 & 활성화

```bash
# venv 라는 이름의 가상환경 생성
$ python -m venv venv

# 가상환경 활성화
$ source venv/Scripts/activate
```

- fastAPI 실행을 위한 라이브러리 설치

```bash
$ cd backend-fastAPI/

# FastAPI
$ pip install fastapi uvicorn

# gunicorn: 멀티 스레드 (다수의 사용자가 사용할 수 있기 때문에, 서버에서 사용)
$ pip install gunicorn # 로컬에선 설치 불필요
```



- 모션인식에 필요한 라이브러리 설치 및 환경 구축

```bash
# 필요 라이브러리 설치
$ pip install -r requirements.txt

# 위 명령으로 라이브러리를 설치해도 모듈 에러가 발생한다면
$ pip install swig
$ pip install pandas
$ pip install tf-slim
$ pip install sklearn
$ pip install request
$ pip install opencv-python
$ pip install tensorflow
$ pip install tqdm
$ pip install scipy
$ pip install psutil
$ pip install pycocotools

# swig 설정
$ cd tf_pose/pafprocess
$ swig -python -c++ pafprocess.i && python setup.py build_ext --inplace 

# tf_slim 설치
$ cd ../../
$ git clone https://github.com/google-research/tf-slim.git

# tensorflow 그래프 파일 다운
$ cd models/graph/cmu
$ bash download.sh
$ cd ../../..
```

- 실행

```bash
$ uvicorn prac2_main:app --reload
```

