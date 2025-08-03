
export interface MediaModel {
    id?: number;
    name: string;
    description: string;
    cover_url?: string;
    industry?: string;

    region?: string;
    city?: string;
    category: string;
    tags?: string[];
    meta?: {}


    uploadFiles?: File[];



    created_at?: string;
    updated_at?: string;
}
