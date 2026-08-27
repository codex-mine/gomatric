function getBaseApiUrl(): string {
  // 1. If explicit NEXT_PUBLIC_API_URL is provided, use it
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== '') {
    let cleanUrl = envUrl.trim().replace(/\/+$/, '');
    if (!cleanUrl.endsWith('/api/v1')) {
      cleanUrl = `${cleanUrl}/api/v1`;
    }
    return cleanUrl;
  }

  // 2. In browser runtime, use relative "/api/v1" which is proxied to API_URL via next.config.ts rewrites
  if (typeof window !== 'undefined') {
    return '/api/v1';
  }

  // 3. In server-side runtime, use API_URL or BACKEND_URL
  const serverUrl = process.env.API_URL || process.env.BACKEND_URL || 'http://localhost:5000';
  const cleanServerUrl = serverUrl.trim().replace(/\/+$/, '');
  return cleanServerUrl.endsWith('/api/v1') ? cleanServerUrl : `${cleanServerUrl}/api/v1`;
}

export const API_CONFIG = {
  baseUrl: getBaseApiUrl(),
  timeout: 15000,
};
