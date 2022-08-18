## React로 Front-End 개발 시작해보기(0720 유튜브 라이브)

📖 목차

1. Why ~ How
2. CRA
3. useState
4. component
5. DataGrid



### ❓ Why ~ How

#### why?

- 새로운 언어라는 막연함(연차가 쌓이면서 기술스택이 바뀔 수 있음 비단, 리액트만의 얘기가 아님)

- 눈에 안들어오는 코드의 막연함



#### Goal

- 맛보기, 짬푸하기



#### How?

- CRA(Create React App)를 이용

- 설치 및 시작

  - Nodejs 설치
  - CRA설치

  ``` bash
  $npx create-react-app "프로젝트명"
  ```

- 간단한 실습 진행
  - React 문법 -> 대부분의 Object 표현 방식 '{}'



### useState

```react
const [name, nameUpdate] = useState('')
// -> [객체, 대체값]
```



### component

- props를 통하여 데이터를 주고받음



### DataGrid

- material-ui 라이브러리에 포함되어 있음
- 간단하게 구현 가능
- https://mui.com/x/api/data-grid/