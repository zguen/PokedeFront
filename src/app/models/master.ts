import { Trainer } from './trainer';

export interface Master {
  id?: number;
  lastname: string;
  firstname: string;
  nickname: string;
  email: string;
  password?: string;
  password_confirm?: string;
  admin: boolean;
  trainer?: Trainer[];
}
