import { MediaModel } from '@/models/Media';
import { MediaFormData } from '@/utils/formData';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import FormDetailView from '../../../common/Widget/form';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ViewProps {
    product: MediaModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    submit: (formData: MediaModel) => void;
}

function MediaEditForm(props: ViewProps) {
    const { product, submitting, setSubmitting, submit } = props;
    const [formData, setFormData] = useState(MediaFormData);
    useEffect(() => {
        if (product) {
            console.log('product', product);
            setFormData({
                ...formData,
                form_data: product
            });
        }
    }, [product]); // 添加依赖项

    const onSubmit = async (form_data: any) => {
        const data = { ...form_data };
        ['pre_from_date', 'pre_to_date'].forEach((field) => {
            if (data[field] === '') data[field] = null;
        });
        // 其它处理...
        submit(data);
    };

    return (
        <>
            <FormDetailView
                className={'p-4 sm:p-6 border rounded-lg'}
                formData={formData}
                disabled={submitting}
                onSubmit={submit}
            />
        </>
    );
}

export default MediaEditForm;
