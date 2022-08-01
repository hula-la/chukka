## openvidu-library-react

1. 리포지토리 복제

   ```bash
   git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.22.0
   ```

2. 튜토리얼 실행

   ```bash
   cd openvidu-tutorials/openvidu-library-react
   npm install
   npm start
   ```

3. OpenVidu Server는 개발 머신에서 실행 중이어야 함. 가장 쉬운 방법은 둘 다 래핑하는 Docker 컨테이너를 실행하는 것

   ```bash
   # WARNING: this container is not suitable for production deployments of OpenVidu Platform
   # Visit https://docs.openvidu.io/en/stable/deployment
   
   docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.22.0
   ```

   



https://da2uns2.tistory.com/entry/Docker-%EB%8F%84%EC%BB%A4-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-1-%EB%8F%84%EC%BB%A4-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0