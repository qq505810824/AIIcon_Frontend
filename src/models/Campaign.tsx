import { AccountModel } from './Account';

export interface CampaignModel {
    id?: number;
    name: string;
    description: string;
    cover_url?: string;

    press_release: string;
    files_url?: string;

    category: string;

    owner?: AccountModel;

    status?: string;

    location: string;
    people: number;

    start_at?: string;
    end_at?: string;

    uploadFiles?: File[];

    medias: [];

    created_at?: string;
    updated_at?: string;
}
