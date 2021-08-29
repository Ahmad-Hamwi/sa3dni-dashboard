export interface CompanyState {
  loading: boolean;
  apiKey?: string;
}

export const initialState: CompanyState = {
  loading: false,
};