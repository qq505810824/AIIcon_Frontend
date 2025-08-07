'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useMyContactsData } from '@/hooks/useAccountContactData';
import { useEffect } from 'react';
import ContactView from './ContactView';

export default function ContactContainter() {
    const { user_id } = useAppContext();
    const { data, isLoading, isError, mutate } = useMyContactsData({ user_id: user_id });
    const handleRefresh = () => {
        mutate();
    };

    useEffect(() => {
        if (data) {
            console.log('contacts data', data);
        }
    }, [data]);
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <ContactView
                {...{
                    handleRefresh,
                    data: data
                }}
            />
        </>
    );
}
