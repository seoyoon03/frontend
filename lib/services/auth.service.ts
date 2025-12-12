import apiClient from '@/lib/api-client';

// 요청/응답 타입 정의
export interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  email?: string;
  phoneNumber?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginWithOtpRequest extends LoginRequest {
  otpCode: number;
}

export interface LoginResponse {
  token: string;
  type: string;
  userId: number;
  username: string;
  name: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface OtpCheckResponse {
  otpEnabled: boolean;
}

// 인증 관련 API 서비스
export const authService = {
  // 회원가입 (수정됨: /api 추가)
  register: async (data: RegisterRequest) => {
    const response = await apiClient.post('/api/auth/register', data);
    return response.data;
  },

  // 로그인 (수정됨: /api 추가)
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('name', response.data.name);
      
      // 로그인 상태 변경 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
    return response.data;
  },

  // OTP 활성화 여부 확인 (수정됨: /api 추가)
  checkOtp: async (username: string): Promise<OtpCheckResponse> => {
    const response = await apiClient.post('/api/auth/check-otp', { username });
    return response.data;
  },

  // OTP 로그인 (수정됨: /api 추가)
  loginWithOtp: async (data: LoginWithOtpRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/api/auth/login-with-otp', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('name', response.data.name);
      
      // 로그인 상태 변경 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
    return response.data;
  },

  // 로그아웃 (수정됨: /api 추가)
  logout: async () => {
    try {
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('name');
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('authStateChanged'));
      }
    }
  },

  // 비밀번호 변경 (수정됨: /api 추가)
  changePassword: async (data: ChangePasswordRequest) => {
    const response = await apiClient.put('/api/auth/change-password', data);
    return response.data;
  },

  // 비밀번호 재설정 (수정됨: /api 추가)
  resetPassword: async (data: ResetPasswordRequest) => {
    const response = await apiClient.post('/api/auth/reset-password', data);
    return response.data;
  },

  // 아이디 찾기 (수정됨: /api 추가)
  findId: async (identifier: string) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const payload = isEmail 
      ? { email: identifier } 
      : { phoneNumber: identifier };
    
    const response = await apiClient.post('/api/auth/find-id', payload);
    return response.data;
  },

  // 회원탈퇴 (수정됨: /api 추가)
  withdraw: async (password: string) => {
    const response = await apiClient.delete('/api/auth/delete-account', {
      data: { password },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('authStateChanged'));
    }
    return response.data;
  },
};