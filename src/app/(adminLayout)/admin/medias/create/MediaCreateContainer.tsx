'use client';

import useAlert from '@/hooks/useAlert';
import { useMediaOperations } from '@/hooks/useMediaData';
import { MediaModel } from '@/models/Media';
import _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import MediaCreateView from './MediaCreateView';

const MediaCreateContainer = () => {
    const params = useParams();
    const token = localStorage.getItem('authorization');
    const email = localStorage.getItem('email');
    const user_id = localStorage.getItem('user_id');
    const [product, setProduct] = useState<MediaModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { addMedia } = useMediaOperations();
    const router = useRouter();

    const handleSubmit = async (formData: MediaModel) => {
        // 处理表单提交
        console.log('formData', formData);
        setSubmitting(true);
        // let upload_file_urls = '';
        // if (formData?.uploadFiles && formData?.uploadFiles.length > 0) {
        //     upload_file_urls = await UploadFilesToAzure(formData?.uploadFiles);
        // }
        // // console.log('upload_file_urls', upload_file_urls);
        const newFormData = {
            ...formData
            // user: localStorage?.getItem('user_id') || null
        };
        // // console.log(_.omit(newFormData, 'uploadFiles'));

        try {
            const { data, error } = await addMedia(_.omit(newFormData, 'uploadFiles'));
            if (error) {
                console.error('發佈錯誤:', error);
                setAlert({
                    title: '發佈錯誤！',
                    type: 'error'
                });
            } else {
                router.push(`/admin/medias`);
                setAlert({
                    title: '發佈成功',
                    type: 'success'
                });
            }
        } catch (error) {
            setAlert({
                title: '發佈錯誤！',
                type: 'error'
            });
            console.error('發佈錯誤！:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MediaCreateView
            {...{
                product,
                submitting,
                setSubmitting,
                handleSubmit
            }}
        />
    );
};

export default MediaCreateContainer;
