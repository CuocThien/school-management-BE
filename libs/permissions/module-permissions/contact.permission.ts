import { EModuleAccess } from '../module-access';

export enum EContactPermission {
  CONTACT_VIEW = 'CONTACT_VIEW',
  CONTACT_CREATE = 'CONTACT_CREATE',
  CONTACT_UPDATE = 'CONTACT_UPDATE',
  CONTACT_ARCHIVE_DELETE = 'CONTACT_ARCHIVE_DELETE',
  CONTACT_MANAGE_ATTACHMENT = 'CONTACT_MANAGE_ATTACHMENT',
}

export type TContactPermission = {
  [key in EContactPermission]: boolean;
};

export const ContactPermission: TContactPermission = {
  CONTACT_VIEW: false,
  CONTACT_CREATE: false,
  CONTACT_UPDATE: false,
  CONTACT_ARCHIVE_DELETE: false,
  CONTACT_MANAGE_ATTACHMENT: false,
};

export type TModuleContactPermission = {
  [key in EContactPermission]: string;
};

export const ModuleContactPermission: TModuleContactPermission = {
  CONTACT_VIEW: EModuleAccess.CONTACT,
  CONTACT_CREATE: EModuleAccess.CONTACT,
  CONTACT_UPDATE: EModuleAccess.CONTACT,
  CONTACT_ARCHIVE_DELETE: EModuleAccess.CONTACT,
  CONTACT_MANAGE_ATTACHMENT: EModuleAccess.CONTACT,
};
