export interface Status {
  loading: boolean
  error: boolean
  errorMessage: string
}

export const initialStatus: Status = {
  loading: true,
  error: false,
  errorMessage: ''
}