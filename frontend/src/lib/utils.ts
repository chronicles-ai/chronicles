import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isTokenExpired(token: string): boolean {
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));
  const expiry = decodedPayload.exp * 1000;
  return Date.now() >= expiry;
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
