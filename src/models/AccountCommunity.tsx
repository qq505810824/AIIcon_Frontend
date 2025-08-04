import { AccountModel } from './Account';
import { CommunityModel } from './Community';

export type AccountCommunityModel = {
    id?: number;
    account: AccountModel;
    community: CommunityModel;

    is_followed?: boolean;

    created_at?: string;
};
