import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    console.log('// 요청이 전달되기 전에 작업 수행');
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    console.log('// 요청 오류가 있는 작업 수행');
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
client.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log('// 응답 데이터가 있는 작업 수행');
    console.log(response);
    return response;
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    console.log('// 응답 오류가 있는 작업 수행');
    try {
      const originalRequest = error.config;
      // console.log(client.defaults.headers.common);
      const refreshToken = localStorage.getItem('refreshToken')
        ? localStorage.getItem('refreshToken')
        : null;
      const userId = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')).userId
        : null;
      if (refreshToken && userId) {
        const config = {
          headers: {
            'refresh-token': `${refreshToken}`,
          },
        };
        const res = await client.post('accounts/refresh/', userId, config);
        const { accessToken } = res.data.data;
        console.log(accessToken);
        client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        // 헤더 설정하고 실패한 요청 다시보내기
        // return await client.request(originalRequest);
      }
    } catch (error) {
      console.log(error);
    }

    return Promise.reject(error);
  },
);

// /*
//   글로벌 설정 예시:

//   // API 주소를 다른 곳으로 사용함
//   client.defaults.baseURL = 'https://external-api-server.com/'

//   // 헤더 설정
//   client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

//   // 인터셉터 설정
//   axios.intercepter.response.use(\
//     response => {
//       // 요청 성공 시 특정 작업 수행
//       return response;
//     },
//     error => {
//       // 요청 실패 시 특정 작업 수행
//       return Promise.reject(error);
//     }
//   })
// */

export default client;
