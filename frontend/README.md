# Chukka Front

## 설치방법

```bash
$ cd frontend
$ npm install
$ npm start
```

## 디렉토리 구조

```
frontend
|-- node_modules
|-- public
|-- src
    |-- app    // store 세팅
        |-- store.js
    |-- components    // 공통 컴포넌트들
        |-- Button.js
        |-- MenuItems.js
        ...
    |-- features    // 기능 관련 코드, 컴포넌트
        |-- users
            |--userActions.js
            |--userSlice.js
        |-- lectures
    |-- layout   // Header, Footer
    |-- pages    // 각 URL에 매핑되는 페이지
    |-- App.js
    |-- index.js
    ...
```
