'use client';

import useAlert from '@/hooks/useAlert';
import useLoad from '@/hooks/useLoad';
import { useMediaData, useMediaOperations } from '@/hooks/useMediaData';
import { MediaModel } from '@/models/Media';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MediaView from './MediaView';

function MediaContainer() {
    const { setAlert } = useAlert();
    const { setLoad } = useLoad();
    const router = useRouter();

    const [products, setProducts] = useState<MediaModel[]>([]);
    const { searchMedia, deleteMedia, updateMedia } = useMediaOperations();
    const [searching, setSearching] = useState(false);

    const { data, isLoading, isError, mutate } = useMediaData({});

    useEffect(() => {
        if (data) {
            const newData = data?.map((item) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
        return () => {};
    }, [data]);

    const handleSearch = async (value: string) => {
        console.log('search value', value);
        setSearching(true);
        const res: any = await searchMedia({ keyword: value });
        setSearching(false);
        if (res.data) {
            const newData = res.data.map((item: MediaModel) => {
                return {
                    ...item,
                    created_at: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm')
                };
            });
            setProducts(newData);
        }
    };
    const handleDelete = async (id: number) => {
        const res: any = await deleteMedia(id);
        console.log('res', res);
        if (res.success) {
            mutate();
            setAlert({
                title: '删除成功',
                type: 'success'
            });
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        console.log('id,status', id, status);
    };

    return (
        <MediaView
            {...{
                data,
                isLoading,
                products,
                onClose: mutate,
                handleSearch,
                searching,
                onDelete: handleDelete,
                onUpdataStatus: handleUpdateStatus
            }}
        />
    );
}

export default MediaContainer;
