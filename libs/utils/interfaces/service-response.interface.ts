export interface IServiceResponse {
  status: number;
  data: any;
  message: string;
  errors: { [key: string]: any };
}

export interface IResponse<T> {
  status: number;
  data: T;
  message: string;
  errors?: { [key: string]: any };
}

export interface IPaging<T> {
  total: number;
  result: T[];
}
