import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function isSameLocalDay(left: string | Date, right: string | Date) {
  const leftDate = new Date(left);
  const rightDate = new Date(right);

  return (
    leftDate.getFullYear() === rightDate.getFullYear() &&
    leftDate.getMonth() === rightDate.getMonth() &&
    leftDate.getDate() === rightDate.getDate()
  );
}

export function startOfLocalDay(value: string | Date) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function diffLocalDays(left: string | Date, right: string | Date) {
  const leftDay = startOfLocalDay(left).getTime();
  const rightDay = startOfLocalDay(right).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.round((leftDay - rightDay) / oneDay);
}
