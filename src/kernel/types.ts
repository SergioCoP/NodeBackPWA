export type Entity<ID extends number | string> = {
    id: ID;
};

export type TPagination = {
    orderBy?: string;
    page?: number;
    offset?: number;
    limit?: number;
    order?: string;    
    filter: string;//texto con el que filtraremos todos los datos
}

export type JSON = {
    [x:string]: any;
}

export type JSONArray = JSON[];

export type TStatus = Entity<number> & {
    description?: string;
}

export enum Errors{
    MISSING_FIELDS = 'MissingFields',
    RECORD_NOT_REGISTERED = 'RecordNotRegistered',
    RECORD_NOT_UPDATED = 'RecordNotUpdated',
    NO_DATA_FOUND = 'NoDataFound',
    CREDENTIAS_MISMATCH = 'CredentialsMismatch',
    UNAUTHORIZED = 'Unauthorized',

}