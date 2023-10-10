import {Entity, TStatus} from '../../../kernel/types';

export type TUserRegister = Entity<number> & {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
}