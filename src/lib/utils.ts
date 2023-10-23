import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatoWithZeros(numero:number, maxDigitos = 7) {
  const numeroFormateado = String(numero).padStart(maxDigitos, '0');
  return numeroFormateado;
}
