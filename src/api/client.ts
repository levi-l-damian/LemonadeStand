// src/api/client.ts
import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Minimal declaration so TS doesn't complain about `process.env` in RN projects
declare const process: { env: Record<string, string | undefined> };

function resolveApiUrl(): string {
  // 1) Allow env override (works for web and native when passed at start)
  const envUrl = process?.env?.EXPO_PUBLIC_API_URL;

  // 2) app.json extra (Expo)
  const extra =
    (Constants?.expoConfig as any)?.extra ??
    (Constants as any)?.manifest?.extra;

  let url: string = envUrl || extra?.apiUrl || 'http://localhost:3001';

  // Web should hit the host's localhost directly during dev
  if (Platform.OS === 'web') {
    return 'http://localhost:3001';
  }

  // Android emulator cannot resolve host `localhost`
  if (Platform.OS === 'android' && url.includes('localhost')) {
    url = url.replace('localhost', '10.0.2.2');
  }

  return url;
}

export const API_URL = resolveApiUrl();

export const http = axios.create({
  baseURL: API_URL,
  timeout: 6000, // keep dev snappy; prevents "frozen" feel
});

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const message =
      err?.response?.data?.message ??
      (err?.code === 'ECONNABORTED' ? 'Request timed out' : err?.message) ??
      'Network error';
    return Promise.reject(new ApiError(message, status));
  }
);
