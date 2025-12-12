import apiClient from '@/lib/api-client';

// 사용자 관련 타입 정의
export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
}

// 사용자 관련 API 서비스
export const userService = {
  // 사용자 프로필 조회
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/api/user/profile');
    return response.data;
  },

  // 사용자 프로필 수정
  updateProfile: async (data: UpdateProfileRequest) => {
    const response = await apiClient.put('/api/user/profile', data);
    return response.data;
  },

  // 계정 삭제
  deleteAccount: async () => {
    const response = await apiClient.delete('/api/user/account');
    return response.data;
  },
};
