import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수명 변경
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // CORS 쿠키 전송을 위해 필요
});

// 요청 인터셉터 - JWT 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료: 자동 리다이렉트 대신 클라이언트에서 UX 처리
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // 전역 인증 상태 변경 알림 (헤더 등 동기화)
        window.dispatchEvent(new Event('authStateChanged'));
        // 필요 시 페이지에서 구독하여 안내할 수 있는 이벤트
        window.dispatchEvent(new Event('unauthorized'));
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
