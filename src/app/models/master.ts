import { Trainer } from './trainer';

export interface Master {
  id?: number;
  lastname: string;
  firstname: string;
  email: string;
  password?: string;
  password_confirm?: string;
  admin: boolean;
  trainers?: Trainer[];
}
