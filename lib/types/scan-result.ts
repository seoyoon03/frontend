export interface ScanVulnerability {
  confidence: number
  details: string
  location: string
  pattern: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  type: string
}

export interface ScanResult {
  success: boolean
  url: string
  vulnerabilities: ScanVulnerability[]
  vulnerability_count: number
}
