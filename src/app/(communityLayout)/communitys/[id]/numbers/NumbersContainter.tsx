'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useAccountCommunityData } from '@/hooks/useAccountCommunityData';
import { MediaModel } from '@/models/Media';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDetailContext } from '../detail-context';
import NumbersView from './NumbersView';

interface ViewProps {
    onConfirm?: any;
    hasSelectedMedias?: MediaModel[];
}

export default function NumbersContainter({ onConfirm, hasSelectedMedias }: ViewProps) {
    const { user_id } = useAppContext();
    const { appData } = useAppDetailContext()
    const param = useParams()
    const { data, isLoading, isError, mutate } = useAccountCommunityData({ currentUserId: user_id, community_id: param['id'] });
    const handleRefresh = () => {
        mutate();
    };
    useEffect(() => {
        console.log('data', data);

    }, [data])
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <NumbersView
                {...{
                    handleRefresh,
                    products: data,
                    onConfirm
                }}
            />
        </>
    );
}
