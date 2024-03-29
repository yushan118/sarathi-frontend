export interface IUser {
  id: string;
  name: string;
  mobileNumber: string;
  isSuspended: boolean;
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
}

export interface IAmbulanceUser {
  id: string;
  name: string;
  mobileNumber: string;
}
