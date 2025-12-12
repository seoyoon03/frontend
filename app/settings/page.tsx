"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronRight, LogOut } from "lucide-react"
import { authService } from "@/lib/services"
import { otpService } from "@/lib/services/otp.service"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [otpEnabled, setOtpEnabled] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState("")
  const [otpSuccess, setOtpSuccess] = useState("")
  const [otpSetup, setOtpSetup] = useState<{ qrCodeImage?: string; qrCodeUrl?: string; secret?: string } | null>(null)
  const [showDisableForm, setShowDisableForm] = useState(false)
  const [otpImageSrc, setOtpImageSrc] = useState<string | null>(null)
  const [otpStatusLoaded, setOtpStatusLoaded] = useState(false)
  const [otpCode, setOtpCode] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await authService.logout()
      toast({
        title: "로그아웃 성공",
        description: "안전하게 로그아웃되었습니다.",
      })
      router.push("/login")
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.")
      return
    }

    if (newPassword.length < 8) {
      setError("새 비밀번호는 최소 8자 이상이어야 합니다.")
      return
    }

    setLoading(true)

    try {
      await authService.changePassword({
        currentPassword,
        newPassword,
      })

      toast({
        title: "비밀번호 변경 성공",
        description: "비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.",
      })

      // 폼 초기화
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // 로그아웃 처리 및 로그인 페이지로 이동
      setTimeout(async () => {
        await authService.logout()
        router.push("/login")
      }, 1500) // 1.5초 후 로그아웃 (토스트 메시지를 볼 시간 제공)
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "비밀번호 변경에 실패했습니다."
      setError(errorMessage)
      toast({
        title: "비밀번호 변경 실패",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // 회원탈퇴 관련 상태
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // 회원탈퇴 핸들러
  const handleWithdraw = async () => {
    setWithdrawError("");
    if (!withdrawPassword) {
      setWithdrawError("비밀번호를 입력해주세요.");
      return;
    }
    setWithdrawLoading(true);
    try {
      await authService.withdraw(withdrawPassword);
      setWithdrawSuccess(true);
      // 1.5초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "회원 탈퇴에 실패했습니다. 비밀번호를 확인해주세요.";
      setWithdrawError(errorMessage);
    } finally {
      setWithdrawLoading(false);
    }
  };

  //아래 코드들을 주석처리하여 로그인 안하면 설정화면에서 로그인으로 바로가기 기능이 비활성화됨
  //주석처리 빼면 로그인 안했을때로 적용되어 설정화면이 로그인화면으로 보임
  // OTP 상태 확인 (초기 진입 시)
  // OTP 상태 최신화 함수
  const fetchOtpStatus = async () => {
    try {
      setOtpLoading(true)
      setOtpError("")
      const status = await otpService.getOtpStatus()
  setOtpEnabled(!!status.otpEnabled)
  // If OTP already enabled for this account, show disable form so user can enter code to disable
  setShowDisableForm(!!status.otpEnabled)
      setOtpSetup(null)
    } catch (e: any) {
      setOtpError(e?.response?.data?.message || "OTP 상태를 불러오지 못했습니다.")
    } finally {
      setOtpLoading(false)
      setOtpStatusLoaded(true)
    }
  }
  useEffect(() => {
    fetchOtpStatus()
  }, [])

  // derive best image src whenever otpSetup changes
  useEffect(() => {
    if (!otpSetup) {
      setOtpImageSrc(null)
      return
    }
    const { qrCodeUrl, qrCodeImage, secret } = otpSetup
    // 1) if qrCodeUrl is a direct http(s) image URL (e.g., already qrserver url), prefer it
    if (qrCodeUrl && (qrCodeUrl.startsWith('http://') || qrCodeUrl.startsWith('https://'))) {
      setOtpImageSrc(qrCodeUrl)
      return
    }
    // 2) if qrCodeImage (data URI) exists
    if (qrCodeImage) {
      setOtpImageSrc(qrCodeImage)
      return
    }
    // 3) if qrCodeUrl is otpauth://, generate qrserver url
    if (qrCodeUrl && qrCodeUrl.startsWith('otpauth:')) {
      setOtpImageSrc(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}&size=300x300`)
      return
    }
    // 4) if secret exists, build otpauth URI and generate
    if (secret) {
      const issuer = 'ShieldHub'
      const label = 'admin'
      const otpauth = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(label)}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`
      setOtpImageSrc(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(otpauth)}&size=300x300`)
      return
    }
    setOtpImageSrc(null)
  }, [otpSetup])

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* OTP 설정 Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 pt-4">
            <h2 className="text-xl font-semibold text-gray-900">OTP 설정</h2>
            <div className="border-b border-gray-200 mt-4"></div>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">OTP 인증</div>
                <div className="text-sm text-gray-500 mt-1">추가 보안을 위한 2단계 인증</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={otpEnabled}
                  disabled={otpLoading || !otpStatusLoaded}
                  onChange={async (e) => {
                    setOtpError("");
                    setOtpSuccess("");
                    setOtpCode("");
                    // reflect user's action immediately
                    setOtpEnabled(e.target.checked);
                    if (e.target.checked) {
                      // 사용자가 ON 클릭 -> 새 QR 발급 및 활성화 흐름 시작
                      setShowDisableForm(false)
                      setOtpLoading(true);
                      try {
                        const setup = await otpService.setupOtp();
                        // Normalize qrCodeImage: some backends return raw base64 without data: prefix
                        let normalizedImage = setup.qrCodeImage;
                        if (normalizedImage && !normalizedImage.startsWith('data:')) {
                          normalizedImage = `data:image/png;base64,${normalizedImage}`;
                        }
                        // store both fields separately so we can decide how to render
                        setOtpSetup({ qrCodeImage: normalizedImage, qrCodeUrl: setup.qrCodeUrl, secret: setup.secret });
                      } catch (err: any) {
                        setOtpError(err?.response?.data?.message || "OTP 설정 정보를 불러오지 못했습니다.");
                        // revert toggle on failure
                        setOtpEnabled(false);
                        setOtpSetup(null);
                      } finally {
                        setOtpLoading(false);
                      }
                    } else {
                      // 사용자가 OFF 클릭 -> 해제(confirm) 폼 표시
                      setOtpSetup(null);
                      setShowDisableForm(true);
                    }
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {/* OTP 연동 UI: 토글 ON & 미연동 → QR/입력폼 */}
            {otpSetup && (
              <div className="px-6 py-4 bg-blue-50">
                <div className="mb-2 text-sm text-gray-700">아래 QR코드를 Google Authenticator 등으로 스캔하세요.</div>
                {/* Decide image source: prefer qrCodeUrl (http) -> qrCodeImage (data:) -> otpauth -> secret */}
                {/* use otpImageSrc state set by effect for predictable fallback behavior */}
                {otpImageSrc && (
                  <>
                    <img
                      src={otpImageSrc}
                      alt="OTP QR코드"
                      className="w-40 h-40 mx-auto mb-2"
                      onError={() => {
                        // If current src fails, try direct qrCodeUrl if available and different
                        const direct = otpSetup?.qrCodeUrl && (otpSetup.qrCodeUrl.startsWith('http://') || otpSetup.qrCodeUrl.startsWith('https://')) ? otpSetup.qrCodeUrl : null
                        if (direct && direct !== otpImageSrc) setOtpImageSrc(direct)
                        else setOtpImageSrc(null)
                      }}
                    />
                    <div className="text-center mb-2">
                      <a href={otpImageSrc} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 underline">Open QR image in new tab</a>
                    </div>
                  </>
                )}
                {/* debug removed */}
                <div className="mb-2 text-xs text-gray-500">수동 입력키: <span className="font-mono">{otpSetup.secret}</span></div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setOtpLoading(true);
                    setOtpError("");
                    setOtpSuccess("");
                    try {
                      await otpService.enableOtp(Number(otpCode));
                      setOtpSuccess("OTP 인증이 활성화되었습니다.");
                      setOtpSetup(null);
                      setOtpCode("");
                      setOtpEnabled(true);
                      await fetchOtpStatus();
                    } catch (err: any) {
                      setOtpError(err?.response?.data?.message || "OTP 인증 활성화에 실패했습니다.");
                      // revert toggle on failure
                      setOtpEnabled(false);
                    } finally {
                      setOtpLoading(false);
                    }
                  }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP 코드 입력 (활성화)</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className="w-32 px-3 py-2 border border-gray-300 rounded"
                    placeholder="6자리 코드"
                    disabled={otpLoading}
                  />
                  <button
                    type="submit"
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                    disabled={otpLoading || otpCode.length !== 6}
                  >
                    {otpLoading ? "처리 중..." : "OTP 인증 활성화"}
                  </button>
                  {otpError && <div className="mt-2 text-red-600 text-sm">{otpError}</div>}
                  {otpSuccess && <div className="mt-2 text-green-600 text-sm">{otpSuccess}</div>}
                </form>
              </div>
            )}
            {/* OTP 해제 입력폼: 토글에서 OFF 클릭 시 보여주기 */}
            {showDisableForm && (
              <div className="px-6 py-4">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setOtpLoading(true);
                    setOtpError("");
                    setOtpSuccess("");
                    try {
                      await otpService.disableOtp(Number(otpCode));
                      setOtpSuccess("OTP 인증이 해제되었습니다.");
                      setOtpCode("");
                      // 업데이트된 상태 반영
                      await fetchOtpStatus();
                      setOtpEnabled(false);
                      setShowDisableForm(false);
                    } catch (err: any) {
                      setOtpError(err?.response?.data?.message || "OTP 인증 해제에 실패했습니다.");
                      // revert toggle since disable failed
                      setOtpEnabled(true);
                    } finally {
                      setOtpLoading(false);
                    }
                  }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP 코드 입력 (해제)</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={e => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className="w-32 px-3 py-2 border border-gray-300 rounded"
                    placeholder="6자리 코드"
                    disabled={otpLoading}
                  />
                  <button
                    type="submit"
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                    disabled={otpLoading || otpCode.length !== 6}
                  >
                    {otpLoading ? "처리 중..." : "OTP 인증 해제"}
                  </button>
                  {otpError && <div className="mt-2 text-red-600 text-sm">{otpError}</div>}
                  {otpSuccess && <div className="mt-2 text-green-600 text-sm">{otpSuccess}</div>}
                </form>
              </div>
            )}
          </div>
        </div>

        {/* 이력 확인 Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 pt-4">
            <h2 className="text-xl font-semibold text-gray-900">이력 확인</h2>
            <div className="border-b border-gray-200 mt-4"></div>
          </div>
          <div>
            <Link
              href="/url-history"
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 block transition-all"
            >
              <span className="text-sm text-gray-900">URL 취약점 분석 이력</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <div className="px-6">
              <div className="border-b border-gray-200"></div>
            </div>
            <Link
              href="/file-history"
              className="w-full px-6 pt-4 pb-4 flex items-center justify-between hover:bg-gray-50 block"
            >
              <span className="text-sm text-gray-900">파일 암호화 이력</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* 계정 복구 Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 pt-4">
            <h2 className="text-xl font-semibold text-gray-900">계정 복구</h2>
            <div className="border-b border-gray-200 mt-4"></div>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/reset-password"
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 block transition-all"
            >
              <span className="text-sm text-gray-900">비밀번호 찾기 (재설정)</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* 비밀번호 변경 Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">비밀번호 변경</h2>
            <div className="border-b border-gray-200 mt-4"></div>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4 px-6 pb-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className="flex items-center gap-4 py-3">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
                className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="현재 비밀번호를 입력하세요"
              />
            </div>
            <div className="flex items-center gap-4 py-3">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="새 비밀번호를 입력하세요"
              />
            </div>
            <div className="flex items-center gap-4 py-3">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="flex-1 appearance-none px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="새 비밀번호를 다시 입력하세요"
              />
            </div>
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "변경 중..." : "비밀번호 변경"}
              </button>
            </div>
          </form>
        </div>

        {/* 로그아웃 & 회원 탈퇴 Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">로그아웃</h3>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="로그아웃"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="px-6 py-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">회원 탈퇴</h3>
                <p className="text-sm text-gray-500">탈퇴 시 복구 불가 등의 주의사항을 확인하세요</p>
              </div>
              <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mb-4">
                <p className="text-sm font-medium text-gray-800 mb-2">주의사항</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 탈퇴 후 계정 복구가 불가능합니다</li>
                  <li>• 모든 데이터가 영구적으로 삭제됩니다</li>
                  <li>• 진행 중인 서비스가 즉시 중단됩니다</li>
                </ul>
              </div>
              {withdrawError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-2">
                  <span className="block sm:inline">{withdrawError}</span>
                </div>
              )}
              {withdrawSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-2">
                  <span className="block sm:inline">회원 탈퇴가 완료되었습니다. 잠시 후 로그인 페이지로 이동합니다.</span>
                </div>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호 확인</label>
                  <input
                    type="password"
                    value={withdrawPassword}
                    onChange={e => setWithdrawPassword(e.target.value)}
                    disabled={withdrawLoading}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="비밀번호를 입력하여 본인 확인"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleWithdraw}
                      disabled={withdrawLoading}
                      className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {withdrawLoading ? "탈퇴 중..." : "회원 탈퇴"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
