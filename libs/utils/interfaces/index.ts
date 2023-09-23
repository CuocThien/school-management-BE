export * from './gateway-response.interface';
export * from './service-response.interface';
export * from './unknow.interface';
export * from './package.type';

export interface IServiceRequestInfo {
  reqUserId: string | number;
  organizationId: string | number;
  requestId: string | number;
  fromPackageName: string;
}

export interface ICreatePayload<T> {
  body: T;
}

export type ICreatePayloadInDetail<T, U> = ICreatePayload<T> & IGetDetailBy<U>;

export interface IUpdatePayload<T> {
  id: string | number;
  body: T;
}

export type IUpdatePayloadBy<T, Z> = T & {
  body: Z;
};

export interface IUpdateById {
  id: string | number;
}

export interface IGetDetail {
  id: string | number;
}

export interface IGetList<T> {
  query: T;
}

export type IGetListInDetail<T, U> = IGetList<T> & IGetDetailBy<U>;

export type IGetDetailBy<T> = T;

export interface IDeleteOne {
  id: string | number;
}

export type IDeleteMany<T> = T;

export interface IArchiveOne {
  id: string | number;
}

export type IArchiveMany<T> = T;

export interface ICancelOne {
  id: string | number;
}

export type ICancelMany<T> = T;
