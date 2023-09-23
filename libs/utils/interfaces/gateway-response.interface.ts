export interface IGateWayResponse {
  status: number | 200;
  data: object | null;
  message: string | null;
  errors: { [key: string]: any } | null;
  details: [];
}
