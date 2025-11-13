import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString?: string | Date | null, formatString?: string) => {
  if (!dateString) return '';
  try {
    return format(typeof dateString === 'string' ? new Date(dateString) : dateString, formatString || 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
