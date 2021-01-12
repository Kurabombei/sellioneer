export interface Roles {
  user?: boolean;
  provider?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  name: string;
  nameToSearch?: string;
  surname?: string;
  email: string;
  password?: string;
  age?: number;
  rating?: number;
  role?: string;
  roles?: Roles;
  isBanned?: boolean;
  avatar?: string;
}
