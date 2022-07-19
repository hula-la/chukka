# WebRTC (Web Real-Time Communication)

### WebRTC API

https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API

### WebRTC 실시간 데이터 교환

https://wormwlrm.github.io/2021/01/24/Introducing-WebRTC.html

### WebRTC (STUN, TURN 서버)

https://andonekwon.tistory.com/59

### STUN / TURN

NAT과 방화벽으로 인한 통신 방해 문제 해결

- STUN (Session Traversal Utilities for NAT) 
  - Kurento 미디어 서버를 Signaling Server로 이용
  - WebRTC 미디어 서버와 클라이언트 API등의 WebRTC 전체 사양이 구현된 패키지
  - https://doc-kurento.readthedocs.io/en/latest/
  - https://github.com/Kurento/kurento-tutorial-java
- TURN (Traversal Using Relays around NAT)
  - STUN의 확장 개념
- https://www.html5rocks.com/ko/tutorials/webrtc/infrastructure/



이후 쿠렌토 설치와 같은 실제 과정은 명세 21페이지 참고



자바 튜토리얼 관련 링크

- https://doc-kurento.readthedocs.io/en/latest/tutorials/java/tutorial-one2many.html
- https://github.com/Kurento/kurento-tutorial-java