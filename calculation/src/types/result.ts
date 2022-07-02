export interface TResult extends TSum {
  id: number;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface TSum {
  number1: number;
  number2: number;
}

export interface TRespResult {
  success: boolean;
  message: string;
  data: TResult[];
}
