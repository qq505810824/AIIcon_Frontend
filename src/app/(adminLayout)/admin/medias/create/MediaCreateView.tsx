import BackView from '@/app/components/base/back/BackView';
import MediasEditForm from '@/app/components/community/medias/edit/form';
import { MediaModel } from '@/models/Media';

interface ViewProps {
    product: MediaModel | null;
    submitting?: boolean;
    setSubmitting?: any;
    handleSubmit: (formData: MediaModel) => void;
}

function MediaCreateView(props: ViewProps) {
    const { product, submitting, setSubmitting, handleSubmit } = props;
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full sm:max-w-7xl px-4 py-4 flex flex-col  ">
                    <BackView title="Back" name="新增" />
                    <MediasEditForm
                        {...{
                            product,
                            submitting,
                            setSubmitting,
                            submit: handleSubmit
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default MediaCreateView;
