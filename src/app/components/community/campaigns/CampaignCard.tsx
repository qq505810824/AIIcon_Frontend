import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { CampaignModel } from '@/models/Campaign';
import { faCalendar, faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';

interface ViewProps {
    campaign: CampaignModel;
}

export default function CampaignCard({ campaign }: ViewProps) {
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();
    const statusLable = () => {
        if (!campaign) return 'planning';
        const now = new Date();
        const start = new Date(campaign.start_at || '');
        const end = new Date(campaign.end_at || '');

        if (now < start) return 'planning';
        if (now >= start && now <= end) return 'active';
        if (now > end) return 'finish';
        return 'planning';
    };
    const status = statusLable();

    const statusStyle =
        {
            planning: 'bg-blue-400 text-white',
            active: 'bg-green-400 text-white',
            finish: 'bg-red-300 text-white'
        }[status] || 'bg-blue-400 text-white';

    const onClickProduct = () => {
        router.push(`/campaigns/${campaign?.id}`);
    };
    return (
        <>
            <div
                key={campaign.id}
                onClick={() => {
                    onClickProduct();
                }}
                className="bg-gray-800 card-hover border border-gold-400/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-xl sm:text-2xl">{campaign.name}</h4>
                        <div
                            className={`flex items-center space-x-1 rounded-full px-2 py-1 ${statusStyle}`}
                        >
                            <span className="text-xs">{statusLable()}</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-4 ">
                        <span className="text-sm sm:text-md text-gray-300">
                            {campaign.description}
                        </span>
                    </div>
                    <div className="flex flex-col mt-4 text-sm space-y-2 text-gray-300">
                        <span>
                            {' '}
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                            {campaign.location}
                        </span>
                        <span>
                            {' '}
                            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                            {campaign.start_at} - {campaign.end_at}
                        </span>
                        <span>
                            {' '}
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            {campaign.people || 0} Projected reach
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
