import Loading from '@/app/components/base/loading';
import { CommunityModel } from '@/models/Community';
import { ArrowBack } from '@mui/icons-material';
import { BookOpen, Calendar as CalendarIcon, Hash, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ChannelDetailContainter from '../../channels/[id]/ChannelDetailContainter';
import PostDetailContainter from '../../channels/[id]/posts/[pid]/PostDetailContainter';
import ChannelContainter from '../../channels/ChannelContainter';
import CourseDetailContainter from '../../courses/[id]/CourseDetailContainter';
import CourseContainter from '../../courses/CourseContainter';
import EventDetailContainter from '../../events/[id]/EventDetailContainter';
import EventContainter from '../../events/EventContainter';
import { useAppDetailContext } from './detail-context';

interface ViewProps {
    community: CommunityModel;
}

export default function CommunityDetailView({ community }: ViewProps) {
    const { activeTab, setActiveTab } = useAppDetailContext();
    const searchParams = useSearchParams();
    const router = useRouter();
    // const [activeTab, setActiveTab] = useState('discussions');

    useEffect(() => {
        if (community) {
            // console.log('community', community);
        }
    }, [community]);

    useEffect(() => {
        const tab = searchParams?.get('activeTab');
        if (tab) {
            setActiveTab({ name: tab });
        }
        // 你可以根据需要同步 meta 等其它信息
    }, [searchParams, setActiveTab]);

    const renderActiveTab = (name?: string) => {
        switch (name || activeTab.name) {
            case 'channels':
                return <ChannelContainter />;
            case 'channel-detail':
                return <ChannelDetailContainter meta={activeTab.meta} />;
            case 'post-detail':
                return <PostDetailContainter meta={activeTab.meta} />;
            case 'courses':
                return <CourseContainter />;
            case 'course-detail':
                return <CourseDetailContainter meta={activeTab.meta} />;
            case 'events':
                return <EventContainter />;
            case 'event-detail':
                return <EventDetailContainter meta={activeTab.meta} />;
            default:
                return <ChannelContainter />;
        }
    };
    const onClickNumbers = () => {
        router.push(`/communitys/${community.id}/numbers`);
    };

    if (!community) return <Loading type="app" />;
    return (
        <>
            <div className="flex-1 p-4  sm:p-6 ">
                {/* Community Header */}
                <div
                    className={`bg-gradient-to-r from-${community?.theme}-500 to-${community?.theme}-600`}
                >
                    <div className="max-w-7xl mx-auto px-2 py-4 sm:px-6 sm:py-8">
                        <div className="flex flex-row justify-between items-center mb-6">
                            <div className="flex items-center space-x-2 ">
                                <button onClick={() => router.push('/')} className="p-2 rounded-lg">
                                    <ArrowBack className="w-5 h-5 hover:text-gold-400  " />
                                </button>
                                <div>
                                    <div
                                        className={`w-10 h-10  md:w-12 md:h-12 bg-${community.theme}-100 rounded-full flex items-center justify-center text-xl`}
                                    >
                                        {community.logo}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-3xl font-bold">
                                        {community?.name || '--'}
                                    </h1>
                                    <p
                                        onClick={onClickNumbers}
                                        className="sm:hidden text-gray-400 underline text-opacity-90 hover:underline cursor-pointer hover:text-gold-400"
                                    >
                                        {community?.accounts_count} members
                                    </p>
                                </div>
                            </div>

                            <div className='hidden sm:block'>
                                <button
                                    onClick={onClickNumbers}
                                    className=" flex items-center text-gray-400 text-opacity-90 hover:underline cursor-pointer hover:text-gold-400 bg-transparent border-none p-0"
                                    style={{ background: 'none' }}
                                >
                                    <Users className="w-6 h-6 mr-2 text-gold-400" />
                                    <span>({community?.accounts_count})</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4 text-white">
                            <button
                                onClick={() => setActiveTab({ name: 'channels' })}
                                className={`shadow-sm border border-gold-400/20 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors ${activeTab?.name?.includes('channel') ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800'}`}
                            >
                                <Hash className="w-6 h-6 mx-auto mb-2 text-gold-400" />
                                <span className="text-sm">Channels</span>
                            </button>
                            <button
                                onClick={() => setActiveTab({ name: 'courses' })}
                                className={` shadow-sm border border-gold-400/20  rounded-lg p-4 text-center hover:bg-gray-700 placeholder:transition-colors ${activeTab?.name?.includes('course') ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800'}`}
                            >
                                <BookOpen className="w-6 h-6 mx-auto mb-2 text-gold-400" />
                                <span className="text-sm">Courses</span>
                            </button>
                            <button
                                onClick={() => setActiveTab({ name: 'events' })}
                                className={` shadow-sm border border-gold-400/20 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors ${activeTab?.name?.includes('event') ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-800'}`}
                            >
                                <CalendarIcon className="w-6 h-6 mx-auto mb-2 text-gold-400" />
                                <span className="text-sm">Events</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Community Content */}
                <div className="max-w-7xl mx-auto px-2 py-4 sm:px-6 sm:py-8">
                    {renderActiveTab()}
                </div>
            </div>
        </>
    );
}
