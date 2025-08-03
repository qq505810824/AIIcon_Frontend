import { MediaModel } from '@/models/Media';
import MediaCard from './MediaCard';

interface ViewProps {
    medias: MediaModel[];
    handleRefresh?: any;
    selectedMedias: any[];
    onToggleCampaign: any
}

export default function MediasLayout({ medias, selectedMedias = [], onToggleCampaign, handleRefresh }: ViewProps) {
    return (
        <>
            <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {medias?.map((media, index) => (
                    <MediaCard
                        media={media}
                        key={index}
                        isAdded={selectedMedias.includes(media.id)}
                        onToggleCampaign={onToggleCampaign}
                    />
                ))}
            </div>
        </>
    );
}
