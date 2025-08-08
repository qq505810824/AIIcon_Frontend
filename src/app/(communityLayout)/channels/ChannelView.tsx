import ChannelItem from '@/app/components/community/channels/ChannelItem';
import { ChannelModel } from '@/models/Channel';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../communitys/[id]/detail-context';

interface ViewProps {
    channels: ChannelModel[];
}

export default function ChannelView({ channels }: ViewProps) {
    const router = useRouter();
    const params = useParams();

    const { activeTab, setActiveTab, permissions } = useAppDetailContext();

    const [selectedChannel, setSelectedChannel] = useState<any>(null);
    const handleCreatChannel = () => {
        router.push(`/channels/create?community_id=${params['id']}`);
    };

    const showCreateChannel = () => {
        return permissions.addChannel
    }

    return (
        <>
            <div className="space-y-6 w-full">
                <div className="flex justify-between items-center  flex-wrap space-y-2">
                    <div>
                        <h3 className="text-xl font-semibold">Text Channels</h3>
                        <p className="text-gray-400 text-sm">
                            Admin-only channels for announcements and updates
                        </p>
                    </div>
                    {showCreateChannel() &&
                        <button
                            onClick={() => {
                                handleCreatChannel();
                            }}
                            className="bg-gold-500 text-white text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Channel</span>
                        </button>
                    }
                </div>

                {/* Channel List */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {channels?.map((channel, index) => (
                        <ChannelItem key={index} channel={channel} />
                    ))}
                </div>
                {channels?.length == 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No channel yet</div>
                        <div className="text-sm">
                            Be the first to create a text channel in this community!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
