'use client';

import Loading from '@/app/components/base/loading';
import { useAppContext } from '@/context/app-context';
import { useMediaData } from '@/hooks/useMediaData';
import { MediaModel } from '@/models/Media';
import MediaView from './MediaView';

interface ViewProps {
    onConfirm?: any;
    hasSelectedMedias?: MediaModel[];
}

export default function MediasContainter({
    onConfirm,
    hasSelectedMedias
}: ViewProps) {
    const { user_id } = useAppContext();
    const { data, isLoading, isError, mutate } = useMediaData({});
    const handleRefresh = () => {
        mutate();
    };
    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <MediaView
                {...{
                    handleRefresh,
                    medias: data,
                    hasSelectedMedias,
                    onConfirm
                }}
            />
        </>
    );
}
