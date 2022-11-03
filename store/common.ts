export interface Status {
  isLoading: boolean
  error: boolean
  errorMessage: string
  successMessage: string
}

export const initialStatus: Status = {
  isLoading: false,
  error: false,
  errorMessage: '',
  successMessage: ''
}