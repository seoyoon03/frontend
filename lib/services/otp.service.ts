import apiClient from '@/lib/api-client';

// OTP 관련 타입 정의
export interface OtpSetupResponse {
  qrCodeUrl: string;
  qrCodeImage: string;
  secret: string;
  manualEntryKey: string;
}

export interface OtpStatusResponse {
  otpEnabled: boolean;
  hasSecret?: boolean;
  username?: string;
}

export interface OtpVerifyRequest {
  code: number;
}

// OTP(2단계 인증) 관련 API 서비스
export const otpService = {
  // OTP 설정 초기화 (QR 코드 생성)
  setupOtp: async (): Promise<OtpSetupResponse> => {
    const response = await apiClient.post('/api/otp/setup');
    return response.data;
  },

  // OTP 활성화
  enableOtp: async (code: number) => {
    const response = await apiClient.post('/api/otp/enable', { code });
    return response.data;
  },

  // OTP 비활성화
  disableOtp: async (code: number) => {
    const response = await apiClient.post('/api/otp/disable', { code });
    return response.data;
  },

  // OTP 상태 확인
  getOtpStatus: async (): Promise<OtpStatusResponse> => {
    const response = await apiClient.get('/api/otp/status');
    const data = response.data || {};
    // normalize different backend shapes: { enabled } or { otpEnabled }
    return {
      otpEnabled: data.otpEnabled ?? data.enabled ?? false,
      hasSecret: !!(data.hasSecret ?? data.has_secret ?? data.secret),
      username: data.username ?? data.user ?? undefined,
    };
  },

  // OTP 코드 검증
  verifyOtp: async (data: OtpVerifyRequest) => {
    const response = await apiClient.post('/api/otp/verify', data);
    return response.data;
  },
};
