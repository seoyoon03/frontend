import apiClient from '@/lib/api-client';

// 파일 관련 타입 정의
export interface FileInfo {
  id: number;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  encryptionType?: string;
}

export interface EncryptResponse {
  encryptedFile: Blob;
  keyFile: Blob;
  fileName: string;
}

// 서버 파일 목록 API 응답 타입
export interface FileListItem {
  fileId: number;
  fileName: string;
  userId: number;
  filePath: string;
  fileSize: number;
  uploadDate: string; // ISO string
  sha256Hash: string;
}

// 파일 보안 관련 API 서비스
export const fileService = {
  // 파일 암호화
  encryptFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/files/encrypt', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    });

    return response.data;
  },

  // 파일 복호화 (업로드)
  decryptFile: async (
    encryptedFile: File,
    keyFile: File,
    originalFileName: string
  ) => {
    const formData = new FormData();
    formData.append('encryptedFile', encryptedFile);
    formData.append('keyFile', keyFile);
    formData.append('originalFileName', originalFileName);

    const response = await apiClient.post('/api/files/decrypt-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    });

    return response.data;
  },

  // 파일 목록 조회
  getFileList: async (): Promise<FileListItem[]> => {
    const response = await apiClient.get('/api/files/list');
    return response.data;
  },

  // 파일 삭제
  deleteFile: async (fileId: number) => {
    const response = await apiClient.delete(`/api/files/${fileId}`);
    return response.data;
  },

  // 파일 다운로드
  downloadFile: async (fileId: number) => {
    const response = await apiClient.get(`/api/files/download/${fileId}`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
