import BackView from '@/app/components/base/back/BackView';
import MediaEditForm from '@/app/components/community/medias/edit/form';
import { MediaModel } from '@/models/Media';

interface ViewProps {
    product: MediaModel | null;
    submitting: boolean;
    handleSubmit: (formData: MediaModel) => void;
}

function MediaEditView(props: ViewProps) {
    const { product, submitting, handleSubmit } = props;
    return (
        <>
            <BackView title="Back" />
            <MediaEditForm
                {...{
                    product,
                    submitting,
                    submit: handleSubmit
                }}
            />
        </>
    );
}

export default MediaEditView;
