'use client';

import useAlert from '@/hooks/useAlert';
import { useMediaDetailByIdData, useMediaOperations } from '@/hooks/useMediaData';
import { MediaModel } from '@/models/Media';
import _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MediaEditView from './MediaEditView';

const MediaEditContainer = () => {
    const params = useParams();
    const [product, setProduct] = useState<MediaModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updateMedia } = useMediaOperations();
    const router = useRouter();

    const { data, isLoading, isError } = useMediaDetailByIdData(Number(params['id']));

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

    const handleSubmit = async (formData: MediaModel) => {
        // 处理表单提交

        setSubmitting(true);
        // let upload_file_urls = '';
        // if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
        //     upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        // }
        // console.log('upload_file_urls', upload_file_urls);
        // const newFormData = {
        //     ...product,
        //     ...formData,
        //     files_url:
        //         formData?.uploadFiles && formData?.uploadFiles.length > 0
        //             ? upload_file_urls
        //             : formData?.files_url
        //     // user: localStorage?.getItem('user_id') || null
        // };

        const newFormData = {
            ...product,
            ...formData
        };

        // console.log(newFormData);

        try {
            const { data, error } = await updateMedia(
                Number(params['id']),
                _.omit(newFormData, 'uploadFiles')
            );
            if (error) {
                console.error('更新文章错误:', error);
                setAlert({
                    title: '更新失敗',
                    type: 'error'
                });
            } else {
                setAlert({
                    title: '更新成功！',
                    type: 'success'
                });
                router.push('/admin/medias');
                // router.back()
            }
        } catch (error) {
            setAlert({
                title: '更新失敗！',
                type: 'error'
            });
            console.error('更新文章错误:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MediaEditView
            {...{
                product,
                submitting,
                handleSubmit
            }}
        />
    );
};

export default MediaEditContainer;
