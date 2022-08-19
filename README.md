# E202팀 SUB-PJT2


# ⚙️시스템 환경 및 구성

## 시스템 환경

- Cloud Server : AWS EC2
- OS : Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)
- CPU 모델 : Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz
- 전체 core 수 : 4 | cpu 당 물리코어  : 4

## 시스템 구성

- nginx (1.18.0 (Ubuntu))
- gunicorn (version 20.0.4)

## 개발 환경

- Front
    - Node.js 16.16.0
    - React 17.0.2
- Back
    - Spring Boot 2.7.2
    - Spring Framework 5.3.22
    - FastAPI 0.79
- DB
    - MySQL 8.0.29
- WebRTc
    - openVidu
- IDE
    - vscode 1.70
    - IntelliJ 2022.1.3
- 형상관리
    - Git

## 포트 정보

| web server(nginx) | 80 |
| --- | --- |
| https | 443 |
| springboot | 8080 |
| fastAPI(gunicorn) | 8000 |
| openvidu | 4443 |
| mysql | 33306 |
<br/>

# 📄 Manual

## 1. AWS 접속

```bash
login as : ubuntu
```

## 2. 소스 다운로드

<aside>
💡 git에 있는 프로젝트의 source code를 ec2 서버에 다운로드합니다.

</aside>

```bash
# 1. 디렉토리 생성
$ mkdir source

# 2. 디렉토리 이동
$ cd source/

# 3. git clone
$ git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12E202.git
```

## 3. 설치

<aside>
💡 프로젝트 실행을 위해 [Nginx], [Node.js], [Java], [Python], [FastAPI], [Gunicorn]을 설치하고
모션인식에 필요한 라이브러리를 다운받습니다.

</aside>

1. Nginx
    
    ```bash
    # 1. nginx
    $ sudo install nginx
    ```
    
2. Node.js
    
    ```bash
    # 1. curl 설치
    $ sudo apt-get install curl
    
    # 2. nvm 설치
    $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    
    # 3. 설정
    $ source ~/.bashrc
    
    # 4. node js LTS 버전 설치
    $ nvm install --lts
    
    # 5. 사용 버전 변경
    $ nvm use 16.16.0
    ```
    
3. Java
    - jdk 1.8
    
    ```bash
    $ sudo apt-get install openjdk-1.8-jdk
    $ sudo install gradle
    ```
    
4. 가상환경 생성&활성화
    
    ```bash
    # venv 라는 이름의 가상환경 생성
    $ virtualenv --python=python venv
    
    # 가상환경 활성화
    $ source /home/ubuntu/venv/bin/activate
    ```
    
5. Python 
    
    version : 3.7
    
    ```bash
    $ cd /home/ubuntu/source/S07P12E202/backend-fastAPI/
    $ sudo apt-get update
    $ sudo apt install python3.7-dev
    ```
    
6. FastAPI
    
    ```bash
    $ pip install fastapi uvicorn
    ```
    
7. Gunicorn
    
    ```bash
    # gunicorn: 멀티 스레드 (다수의 사용자가 사용할 수 있기 때문에, 서버에서 사용)
    pip install gunicorn
    ```
    
8. 모션인식에 필요한 라이브러리 다운 및 환경 구축
    
    ```bash
    # 디렉토리 이동
    $ 
    
    # 필요 라이브러리 설치
    $ pip install -r requirements.txt
    $ sudo apt install swig
    $ pip install pandas
    $ pip install tf-slim
    $ pip install sklearn
    
    # swig 설정
    # download.sh 에러 발생할 수 있음.
    $ cd tf_pose/pafprocess
    $ swig -python -c++ pafprocess.i && python setup.py build_ext --inplace 
    
    ```
    
    - [download.sh](http://download.sh) 에러 발생시, 윈도우 환경에서 git clone 받은 후, /home/ubuntu/fastAPI/model 폴더를 MobaXterm 을 통해 aws ec2 서버에 넣어줍니다.

## 4. 백엔드 빌드

💡 Spring Boot backend 서버는 로컬 환경에서 build 후 aws ec2 서버에 업로드 합니다.


**[로컬환경]**

1. git clone
    
    ```bash
    # 1. git clone
    $ git clone https://lab.ssafy.com/s07-webmobile3-sub2/S07P12E202.git
    # 2. 디렉토리 이동
    $ cd S07P12E202/backend-java
    ```
    
2. build
    
    ```bash
    # build
    $ ./gradlew build
    ```
    
3. /build/lib 폴더에 .jar 파일 생성 확인
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c899404b-8812-4af3-8189-1ed807eee976/Untitled.png)
    
4. AWS EC2 업로드
    
    /home/ubuntu/source 폴더 하위에 업로드
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04a0cbb3-3482-49d1-ae93-0a97854ec91e/Untitled.png)
    

## 5. 프론트엔드 빌드

💡 다운받은 source code 로 build 폴더를 생성합니다.


1. build
    
    ```bash
    
    # 1. 디렉토리 이동
    $ cd S07P12E202/frontend/ #/home/ubuntu/source/S07P12E202/frontend/
    
    # 2. 빌드
    $ npm build
    ```
    
2. /home/ubuntu/source/S07P12E202/frontend/build 폴더 생성 확인
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2143bd4b-3431-4646-8956-3f850ec81c43/Untitled.png)
    
    ### 환경 변수 파일 생성
    
    - /home/ubuntu/source/S07P12E202/frontend/ 하위에 **`.env`** 파일 생성
        
        ```bash
        # .env
        REACT_APP_S3_URL_DANCE = 'https://chukkadance.s3.ap-northeast-2.amazonaws.com'
        REACT_APP_S3_URL_CHUKKA = 'https://chukkachukka.s3.ap-northeast-2.amazonaws.com'
        ```
        

## 6. 실행

<aside>
💡 jar 파일, Nginx, Gunicorn 을 실행합니다.

</aside>

1. jar
    
    ```bash
    # 디텔토리 이동
    $ cd /home/ubuntu/source
    # 실행
    $ java -jar ssafy-web-project-1.0-SNAPSHOT.jar &
    ```
    
2. Nginx
    
    ```bash
    # 시작
    $ sudo service nginx start
    
    # 재시작
    $ sudo service nginx restart
    ```
    
3. Gunicorn
    
    ```bash
    # 가상환경 활성화
    $ source /home/ubuntu/venv/bin/activate
    # 디렉토리 이동
    $ cd /home/ubuntu/source/S07P12E202/backend-fastAPI/
    # gunicorn 백그라운드 실행
    $ gunicorn -k uvicorn.workers.UvicornWorker --access-logfile ./gunicorn-access.log prac2_main:app --bind 0.0.0.0:8000 --workers 2 --daemon
    ```
    

# Nginx Default 값

1. default.conf 파일
    - /etc/nginx/sites-available/default.conf
        
        ```bash
        
        server {
        
        	root /home/ubuntu/source/S07P12E202/frontend/build;
        
        	index index.html index.htm index.nginx-debian.html;
         	server_name i7e202.p.ssafy.io; # managed by Certbot
        
        	location / {
        		try_files $uri $uri/ /index.html;
        	}
        	
        	location /api {
        		include proxy_params;
        		proxy_pass http://127.0.0.1:8080;
        	}
        
        	location /fastAPI {
        		include proxy_params;
        		proxy_pass http://127.0.0.1:8000;
        		proxy_http_version 1.1;
        	}
        
        	location /fastAPI/ws {
        		proxy_set_header X-Real-IP $remote_addr;
        		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        		proxy_set_header Host $http_host;
        		
        		proxy_pass http://127.0.0.1:8000;
        		
        		proxy_http_version 1.1;
        		proxy_set_header Upgrade $http_upgrade;
        		proxy_set_header Connection "upgrade";
        		proxy_set_header Origin "";
        	}	
        
            listen [::]:443 ssl ipv6only=on; # managed by Certbot
            listen 443 ssl; # managed by Certbot
            ssl_certificate /etc/letsencrypt/live/i7e202.p.ssafy.io/fullchain.pem; # managed by Certbot
            ssl_certificate_key /etc/letsencrypt/live/i7e202.p.ssafy.io/privkey.pem; # managed by Certbot
            include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
            ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
        
        }
        
        upstream ws-backend {
        	# enable sticy session based on IP
        	ip_hash;
        	
        	server 127.0.0.1:8080;
        }
        
        server {
            if ($host = i7e202.p.ssafy.io) {
                return 301 https://$host$request_uri;
            } # managed by Certbot
        
        	listen 80 ;
        	listen [::]:80 ;
            server_name i7e202.p.ssafy.io;
            return 404; # managed by Certbot
        
        }
        ```
        
2. nginx.conf 파일
    - /etc/nginx/nginx.conf
        
        ```bash
        user www-data;
        worker_processes auto;
        pid /run/nginx.pid;
        include /etc/nginx/modules-enabled/*.conf;
        
        events {
        	worker_connections 768;
        	# multi_accept on;
        }
        
        http {
        	client_max_body_size 20M;
        
        	sendfile on;
        	tcp_nopush on;
        	tcp_nodelay on;
        	keepalive_timeout 65;
        	types_hash_max_size 2048;
        
        	include /etc/nginx/mime.types;
        	default_type application/octet-stream;
        
        	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        	ssl_prefer_server_ciphers on;
        
        	access_log /var/log/nginx/access.log;
        	error_log /var/log/nginx/error.log;
        
        	gzip on;
        
        	include /etc/nginx/conf.d/*.conf;
        	include /etc/nginx/sites-enabled/*;
        }
        ```
        

# MySQL

- username : `chukka`
- password : `choyosk297445@`

# ERD

![chukka_ERD.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0b36a01b-8072-430d-9afc-e9d1972bf38e/chukka_ERD.png)

[chukka_ERD.mwb](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91ec7b30-5915-49a1-89cb-5b0acdd900ca/chukka_ERD.mwb)

## Dump data

[chukka_dump.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4e89456-19ed-4f3f-af5b-b0ecd865cec9/chukka_dump.zip)

# AWS S3 bucket

- policy
    
    ```json
    {
        "Version": "2012-10-17",
        "Id": "Policy1659410125978",
        "Statement": [
            {
                "Sid": "Stmt1659410114477",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:*",
                "Resource": "arn:aws:s3:::chukkadance"
            }
        ]
    }
    ```
    
- access key : `AKIASLFMVV5EYKPNMRRL`
- bucket : `chukkadance`
- region : `ap-northeast-2`

# OpenVidu

<aside>
💡 webRTC 구현을 위한 오픈비두 셋팅은 공식문서를 참고하였습니다.

</aside>

- [OpenVidu 공식문서](https://docs.openvidu.io/en/2.22.0/deployment/ce/on-premises/)

<br/>

---


**[노션페이지](https://www.notion.so/a621742d3a8141509e157a833d72e788#e26bdeb3504d4aa79fd3c2aea1dd2611)**

## 목차

[브랜치 구조](#브랜치-구조)  
[커밋 메시지](#커밋-메시지)  
[MR 템플릿](#mr-템플릿)

## 브랜치 전략

## 브랜치 구조

- `master / develop / [front, fastapi, spring]`

- `master / feature / [front, fastapi, spring] / [기능명]`

```
|-- master
|----develop/front
|------feature/front/feature1
|------feature/front/feature2

|----develop/fastapi
|------feature/fastapi/feature1
|------feature/fastapi/feature2

|----develop/spring
|------feature/spring/feature1
|------feature/spring/feature2
```

## 커밋 메시지

```
################
# <이모지> <제목> 의 형식으로 제목을 아래 공백줄에 작성
# 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성 / 끝에 마침표 금지
✨ 로그인 기능 추가

# 바로 아래 공백은 지우지 마세요 (제목과 본문의 분리를 위함)

################
# 본문(구체적인 내용)을 아랫줄에 작성
# 여러 줄의 메시지를 작성할 땐 "-"로 구분 (한 줄은 72자 이내)
- 회원 정보 확인
- 토큰 발급 및 저장
################
# 꼬릿말(footer)을 아랫줄에 작성 (현재 커밋과 관련된 이슈 번호 추가 등)
# Jira Smart commit 사용 시 Jira 이슈 또한 종료할 수 있음.
# 예) Close #7

################
# ✨ : 새로운 기능 추가
# 🐛 : 버그 수정
# 📚 : 문서 수정
# 🚨 : 테스트 코드 추가
# 🔨 : 코드 리팩토
# 📝 : 코드 의미에 영향을 주지 않는 변경사항
# 🔧 : 기타 변경사항, 프로`덕션 코드 변경사항 없음
################
```

## MR 템플릿

```
## 어떤 이유로 MR를 하셨나요?
- [ ] feature 병합(feature issue #를 남겨주세요)
- [ ] 버그 수정(아래에 issue #를 남겨주세요)
- [ ] 코드 개선
- [ ] 기타(아래에 자세한 내용 기입해주세요)

## 스크린샷 및 세부 내용 - 왜 해당 MR이 필요한지 자세하게 설명해주세요
- 세부사항을 항목으로 설명해주세요

## MR하기 전에 확인해주세요
- [ ] local code lint 검사를 진행하셨나요?
- [ ] local ci test를 진행하셨나요?

## relavant issue number
- 관련된 이슈 넘버가 있으면 이곳에 기입해주세요
```
