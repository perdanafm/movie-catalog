import {
  VITE_PUBLIC_THEMOVIEDB3_API_KEY,
  VITE_PUBLIC_THEMOVIEDB3_BASE_URL,
} from '@/constants/env';
import axios from 'axios';

const API_URL = String(VITE_PUBLIC_THEMOVIEDB3_BASE_URL);
const API_KEY = String(VITE_PUBLIC_THEMOVIEDB3_API_KEY);

export const api = axios.create({
  baseURL: String(API_URL),
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
