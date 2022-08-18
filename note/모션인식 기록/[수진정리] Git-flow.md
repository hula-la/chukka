## Git-flow

- 개발 프로세스
  - 5명은 우선순위에 따라 나열된 작업 중 우선순위가 높은 작업부터 하나씩 선택하여 작업을 나눠 가짐.



- Git Repository

  - Upstream Remote Repository

    - 개발자들이 공유하는 저장소
    - 최신 소스코드가 저장되어 있는 원격 저장소

  - Origin Repository

    - Upstream Repository를 Fork한 원격 개인 저장소

  - Local Repository

    - 내 컴퓨터에 저장되어 있는 개인 저장소

    <img src="https://user-images.githubusercontent.com/88833439/179151554-cbeca3a9-cb91-435e-a493-5159a1983ca9.png" alt="image" style="zoom:70%;" />





##### Git-Flow 사용법 (우/형)

#### 1. 티켓 처리하기

1. upstream/feature-user 브랜치에서 작업 브랜치(bfm-100_login_layout)를 생성합니다.

   > (feature-user)]$ git fetch upstream
   > (feature-user)]$ git checkout -b bfm-100_login_layout –track upstream/feature-user

2. 작업 브랜치에서 소스코드를 수정합니다. (뚝딱뚝딱 :hammer:)

3. 작업 브랜치에서 변경사항을 커밋합니다. (보통은 vi editor에서 커밋 메세지를 작성 함)

   > (bfm-100_login_layout)]$ git commit -m "BFM-100 로그인 화면 레이아웃 생성"

4. 만약 커밋이 불필요하게 어려 개로 나뉘어져 있다면 squash를 합니다. (커밋 2개를 합쳐야 한다면)

   > (bfm-100_login_layout)]$ git rebase -i HEAD~2

5. 작업 브랜치를 upstream/feature-user에 rebase합니다.

   > (bfm-100_login_layout)]$ git pull –rebase upstream feature-user

6. 작업 브랜치를 origin에 push합니다.

   > (bfm-100_login_layout)]$ git push origin bfm-100_login_layout

7. Github에서 bfm-100_login_layout 브랜치를 feature-user에 merge하는 Pull Request를 생성합니다.

8. 같은 feature를 개발하는 동료에게 리뷰 승인을 받은 후 자신의 Pull Request를 merge합니다. 만약 혼자 feature를 개발한다면 1~2명의 동료에게 리뷰 승인을 받은 후 Pull Request를 merge합니다.

<img src="https://user-images.githubusercontent.com/88833439/179154655-dbd96f84-be06-43fc-b7df-639b873bb9ec.png" alt="image" style="zoom:50%;" />



#### 2. develop 변경사항을 feature로 가져오기 (Optional)

- feature 브랜치에서 기능을 완료하는데 해야 할 작업들이 많아서 오래 걸리는 경우가 있음.
- develop에 추가된 기능들이 필요한 경우가 종종 생김
- feature 브랜치에 develop의변경사항들을 가져와야 함

1. feature-user 브랜치에 upstream/develop 브랜치를 merge 합니다.

   > (feature-user)]$ git fetch upstream
   > (feature-user)]$ git merge –no-ff upstream/develop

2. upstream/develop의 변경사항이 merge된 feature-user를 upstream에 push 합니다.

   > (feature-user)]$ git push upstream feature-user