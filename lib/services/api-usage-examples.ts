// API 사용 예시 및 가이드

/**
 * 1. 인증 API 사용 예시
 */

// 회원가입
import { authService } from '@/lib/services';

const handleRegister = async () => {
  try {
    const result = await authService.register({
      username: 'testuser',
      password: 'password123',
      name: '홍길동',
      email: 'test@example.com',
    });
    console.log('회원가입 성공:', result);
  } catch (error) {
    console.error('회원가입 실패:', error);
  }
};

// 로그인
const handleLogin = async () => {
  try {
    const result = await authService.login({
      username: 'testuser',
      password: 'password123',
    });
    console.log('로그인 성공:', result);
    // 토큰은 자동으로 localStorage에 저장됨
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};

// OTP 확인 후 로그인
const handleLoginWithOtpCheck = async (username: string, password: string) => {
  try {
    // 1. OTP 활성화 여부 확인
    const otpStatus = await authService.checkOtp(username);

    if (otpStatus.otpEnabled) {
      // 2. OTP가 활성화되어 있으면 OTP 입력 페이지로 이동
      // router.push('/login/otp');
    } else {
      // 3. 일반 로그인 진행
      const result = await authService.login({ username, password });
      console.log('로그인 성공:', result);
    }
  } catch (error) {
    console.error('로그인 처리 실패:', error);
  }
};

/**
 * 2. 파일 암호화/복호화 API 사용 예시
 */

import { fileService } from '@/lib/services';

// 파일 암호화
const handleFileEncrypt = async (file: File) => {
  try {
    const encryptedData = await fileService.encryptFile(file);
    // Blob 데이터를 다운로드
    const url = window.URL.createObjectURL(encryptedData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}.encrypted`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('파일 암호화 실패:', error);
  }
};

// 파일 복호화
const handleFileDecrypt = async (
  encryptedFile: File,
  keyFile: File,
  originalFileName: string
) => {
  try {
    const decryptedData = await fileService.decryptFile(
      encryptedFile,
      keyFile,
      originalFileName
    );
    // Blob 데이터를 다운로드
    const url = window.URL.createObjectURL(decryptedData);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalFileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('파일 복호화 실패:', error);
  }
};

// 파일 목록 조회
const handleGetFileList = async () => {
  try {
    const files = await fileService.getFileList();
    console.log('파일 목록:', files);
  } catch (error) {
    console.error('파일 목록 조회 실패:', error);
  }
};

/**
 * 3. OTP 설정 API 사용 예시
 */

import { otpService } from '@/lib/services';

// OTP 설정 (QR 코드 생성)
const handleOtpSetup = async () => {
  try {
    const result = await otpService.setupOtp();
    console.log('QR 코드:', result.qrCodeUrl);
    console.log('수동 입력 키:', result.manualEntryKey);
  } catch (error) {
    console.error('OTP 설정 실패:', error);
  }
};

// OTP 활성화
const handleOtpEnable = async (code: number) => {
  try {
    const result = await otpService.enableOtp(code);
    console.log('OTP 활성화 성공:', result);
  } catch (error) {
    console.error('OTP 활성화 실패:', error);
  }
};

// OTP 상태 확인
const handleOtpStatus = async () => {
  try {
    const status = await otpService.getOtpStatus();
    console.log('OTP 상태:', status);
  } catch (error) {
    console.error('OTP 상태 확인 실패:', error);
  }
};

/**
 * 4. 웹사이트 검사 API 사용 예시
 */

import { websiteService } from '@/lib/services';

// 웹사이트 검사
const handleWebsiteInspect = async (url: string) => {
  try {
    const result = await websiteService.inspectWebsite({ url });
    console.log('검사 결과:', result);
    console.log('위험도:', result.status);
    console.log('점수:', result.score);
  } catch (error) {
    console.error('웹사이트 검사 실패:', error);
  }
};

// 검사 이력 조회
const handleGetInspectionHistory = async () => {
  try {
    const history = await websiteService.getInspectionHistory();
    console.log('검사 이력:', history);
  } catch (error) {
    console.error('검사 이력 조회 실패:', error);
  }
};

/**
 * 5. 사용자 프로필 API 사용 예시
 */

import { userService } from '@/lib/services';

// 프로필 조회
const handleGetProfile = async () => {
  try {
    const profile = await userService.getProfile();
    console.log('프로필:', profile);
  } catch (error) {
    console.error('프로필 조회 실패:', error);
  }
};

// 프로필 수정
const handleUpdateProfile = async () => {
  try {
    const result = await userService.updateProfile({
      name: '김철수',
      email: 'newemail@example.com',
    });
    console.log('프로필 수정 성공:', result);
  } catch (error) {
    console.error('프로필 수정 실패:', error);
  }
};

/**
 * 6. React 컴포넌트에서 사용 예시
 */

/*
'use client';

import { useState } from 'react';
import { authService } from '@/lib/services';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await authService.login({ username, password });
      console.log('로그인 성공:', result);
      // 성공 처리 (예: 리다이렉트)
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자명"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit" disabled={loading}>
        {loading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
*/

export {};
