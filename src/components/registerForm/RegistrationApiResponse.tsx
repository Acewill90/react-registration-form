import type { ErrorResponse } from './ErrorResponse';

export interface RegistrationApiResponse {
  message: string;
  errors?: ErrorResponse;
}
