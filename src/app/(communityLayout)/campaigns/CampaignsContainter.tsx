'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useCampaignData } from '@/hooks/useCampaignData';
import CampaignsView from './CampaignsView';

export default function CampaignsContainter() {
    const { user_id } = useAppContext();
    const { data, isLoading, isError, mutate } = useCampaignData({ user_id: user_id });
    const handleRefresh = () => {
        mutate();
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <CampaignsView
                {...{
                    handleRefresh,
                    campaigns: data
                }}
            />
        </>
    );
}
