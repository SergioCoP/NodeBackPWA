import {Entity} from '../../../kernel/types';

export type TPerson = Entity<number> & {
    name: string;
    surname: string;
    lastname?: string;
    birthdate?: string;
    createdAt?: string;
    curp?: string;
    rfc?: string;
}