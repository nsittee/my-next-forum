export interface Status {
  isLoading: boolean
  error: boolean
  errorMessage: string
}

export const initialStatus: Status = {
  isLoading: true,
  error: false,
  errorMessage: ''
}