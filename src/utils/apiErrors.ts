import { isAxiosError } from "axios";

export function isNotFoundError(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404;
}

export function apiErrorMessage(error: unknown): string {
  if (isAxiosError(error) && typeof error.response?.data?.message === "string") {
    return error.response.data.message;
  }
  return "Não foi possível concluir a operação. Tente novamente.";
}
