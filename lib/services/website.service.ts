import apiClient from '@/lib/api-client';
import type {
  VulnerabilityAnalysisRequest,
  VulnerabilityAnalysisResponse,
  VulnerabilityAnalysisError,
} from '@/lib/types/vulnerability.types';

/**
 * 웹 취약점 분석 API 서비스
 * 백엔드 엔드포인트: /api/analysis/start
 */
export const vulnerabilityService = {
  /**
   * 웹사이트 취약점 분석 시작
   * @param url - 분석할 웹사이트 URL
   * @returns 취약점 분석 결과
   */
  startAnalysis: async (
    url: string
  ): Promise<VulnerabilityAnalysisResponse> => {
    try {
      const response = await apiClient.post<VulnerabilityAnalysisResponse>(
        '/api/analysis/start',
        { url }
      );
      return response.data;
    } catch (error: any) {
      // 에러 응답 처리
      if (error.response?.data) {
        const errorData = error.response.data as VulnerabilityAnalysisError;
        throw new Error(errorData.message || '분석 중 오류가 발생했습니다.');
      }
      throw new Error('서버와 통신할 수 없습니다.');
    }
  },

  /**
   * URL 유효성 검증
   * @param url - 검증할 URL
   * @returns 유효한 URL인지 여부
   */
  validateUrl: (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  },
};

// 레거시 호환성을 위한 별칭 (기존 코드와의 호환성 유지)
export const websiteService = {
  /**
   * @deprecated vulnerabilityService.startAnalysis 사용 권장
   */
  inspectWebsite: async (data: { url: string }) => {
    return vulnerabilityService.startAnalysis(data.url);
  },

  // 분석 이력 목록 조회 (페이징)
  getAnalysisList: async (page = 0, size = 10) => {
    const response = await apiClient.get("/api/analysis", { params: { page, size } })
    return response.data
  },
  // 상세 조회 등은 필요시 추가
};
