import { AccountModel } from './Account';

export type ContactModel = {
    id?: number;
    owner: AccountModel;
    account: AccountModel;

    meta?: {};
    source?: string;

    created_at?: string;
};
