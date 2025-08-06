'use client';

import Loading from '@/app/components/base/loading';
import { useCampaignDetailByIdData } from '@/hooks/useCampaignData';
import { useParams } from 'next/navigation';
import CampaignDetailView from './CampaignDetailView';

export default function CampaignDetailContainter() {
    const params = useParams()
    const { data, isLoading, isError, mutate } = useCampaignDetailByIdData(Number(params['id']));

    if (!data) return <Loading type="app" />;
    return (
        <>
            <CampaignDetailView
                {...{
                    product: data
                }}
            />
        </>
    );
}
