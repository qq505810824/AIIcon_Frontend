'use client';

import useAlert from '@/hooks/useAlert';
import { useCampaignDetailByIdData, useCampaignOperations } from '@/hooks/useCampaignData';
import { CampaignModel } from '@/models/Campaign';
import _ from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CampaignEditView from './CampaignEditView';

const CampaignEditContainer = () => {
    const params = useParams();
    const [product, setProduct] = useState<CampaignModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const { setAlert } = useAlert();
    const { updateCampaign } = useCampaignOperations();
    const router = useRouter();

    const { data, isLoading, isError } = useCampaignDetailByIdData(Number(params['id']));

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

    const handleSubmit = async (formData: CampaignModel) => {
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
            const { data, error } = await updateCampaign(
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
                router.back();
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
        <CampaignEditView
            {...{
                product,
                submitting,
                handleSubmit
            }}
        />
    );
};

export default CampaignEditContainer;
