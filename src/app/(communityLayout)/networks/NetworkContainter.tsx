'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useContactStatisticsData } from '@/hooks/useAccountContactData';
import { useEffect } from 'react';
import NetworkView from './NetworkView';

export default function NetworkContainter() {
    const { user_id } = useAppContext();
    const { data, isLoading, isError, mutate } = useContactStatisticsData({ user_id: user_id });
    const handleRefresh = () => {
        mutate();
    };

    useEffect(() => {
        if (data) {
            console.log('statis data', data);
        }
    }, [data]);
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <NetworkView
                {...{
                    handleRefresh,
                    data: data
                }}
            />
        </>
    );
}
