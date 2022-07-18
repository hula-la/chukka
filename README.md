# E202팀 SUB-PJT2

**[노션페이지](https://www.notion.so/a621742d3a8141509e157a833d72e788#e26bdeb3504d4aa79fd3c2aea1dd2611)**

## 목차

[브랜치 구조](#브랜치-구조)  
[커밋 메시지](#커밋-메시지)  
[MR 템플릿](#mr-템플릿)

## 브랜치 전략

- Git Flow

## 브랜치 구조

- `master / develop / [front, back, embedded]`

- `master / feature / [front, back, embedded] / [기능명]`

```
|-- master
|----develop/front
|------feature/front/feature1
|------feature/front/feature2

|----develop/back
|------feature/back/feature1
|------feature/back/feature2

|----develop/embedded
|------feature/embedded/feature1
|------feature/embedded/feature2
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