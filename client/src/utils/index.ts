// utils/cn.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs));
}

function formatIndianNumber(num: number | string): string {
  const parts = num.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? '.' + parts[1] : '';

  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  const formatted =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherDigits ? ',' : '') + lastThree;

  return formatted + decimalPart;
}


export {
  formatIndianNumber
}