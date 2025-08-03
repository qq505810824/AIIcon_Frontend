import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { MediaModel } from '@/models/Media';
import { faBriefcase, faCheck, faMapMarkerAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';


interface ViewProps {
    media: MediaModel;
    isAdded?: boolean;
    onToggleCampaign?: (id: any) => void;
}

export default function MediaCard({ media, isAdded, onToggleCampaign }: ViewProps) {
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();
    const statusLable = () => {
        if (!media) return 'newspaper';

        return media.category;
    };
    const status = statusLable();

    const statusStyle =
        {
            newspaper: 'bg-blue-400 text-white',
            active: 'bg-green-400 text-white',
            finish: 'bg-red-300 text-white'
        }[status] || 'bg-blue-400 text-white';

    const onAddToCampaign = () => {

    }

    return (
        <>
            <div
                key={media.id}
                onClick={() => {
                    // handleClickCourse(course)
                    // setSelectedCourse(course);
                    // setActiveTab({ name: 'course-detail', meta: { course } });
                }}
                className="bg-gray-800 card-hover border border-gold-400/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-xl sm:text-2xl">{media.name}</h4>
                        <div
                            className={`flex items-center space-x-1 rounded-full px-2 py-1 ${statusStyle}`}
                        >
                            <span className="text-xs">{statusLable()}</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-4 ">
                        <span className="text-sm sm:text-md text-gray-300">
                            {media.description}
                        </span>
                    </div>
                    <div className="flex flex-col mt-4 text-sm space-y-2 text-gray-300">
                        <span>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            {media.region},{media.city}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                            {media.industry}
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faTags} className="mr-2" />
                            {media.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full mr-2 text-xs font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </span>
                    </div>
                    <div className='flex mt-4'>
                        <button
                            className={`w-full ${isAdded ? 'bg-gray-400' : 'bg-gold-400 hover:bg-gold-500'} text-white text-sm px-4 py-2 rounded-lg`}
                            onClick={e => {
                                e.stopPropagation();
                                onToggleCampaign && onToggleCampaign(media.id);
                            }}
                        >
                            {isAdded && (
                                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                            )}
                            {isAdded ? 'Selected' : 'Add to Campaign'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
