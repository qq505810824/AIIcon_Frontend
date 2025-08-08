import CalendarCard from '@/app/components/calendar/CalendarCard';
import { CalendarModel } from '@/models/Calendar';
import { CalendarCategorys } from '@/utils/constant';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDetailContext } from '../communitys/[id]/detail-context';

interface ViewProps {
    data: any;
    isLoading: any;
    products: CalendarModel[];
    onClose: () => void;
    handleSearch: any;
    onSwitchCategory: any;
    searching?: boolean;
    filters?: any;
    setFilters?: any;
}

function EventView(props: ViewProps) {
    const {
        isLoading,
        products,
        onClose,
        handleSearch,
        onSwitchCategory,
        searching,
        filters,
        setFilters
    } = props;

    const router = useRouter();

    const [menu, setMenu] = useState('');
    const [keyword, setKeyword] = useState('');
    const params = useParams();
    const { permissions } = useAppDetailContext()

    const switchMenu = (value: string) => {
        setMenu(value);
        // onSwitchCategory(value);
    };

    const handleCreatEvent = () => {
        router.push(`/events/create?community_id=${params['id']}`);
    };

    const showCreateEvent = () => {
        return permissions.addEvent
    }
    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap space-y-2">
                    <div>
                        <h3 className="text-xl font-semibold">Events</h3>
                        <p className="text-gray-400 text-sm">
                            Virtual and in-person events for community members
                        </p>
                    </div>
                    {showCreateEvent() &&
                        <button
                            onClick={() => {
                                handleCreatEvent();
                            }}
                            className="bg-gold-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Event</span>
                        </button>
                    }
                </div>

                {/* Event Filters */}
                <div className="flex items-center space-x-4">
                    {CalendarCategorys.map((category, index) => {
                        return (
                            <button
                                key={index}
                                className={`px-4 py-2 rounded-lg text-sm text-white ${menu == category.value ? 'bg-gold-400 ' : ' hover:bg-gold-400'}`}
                                onClick={() => {
                                    switchMenu(category.value);
                                    setFilters({
                                        ...filters,
                                        category: category.value
                                    });
                                }}
                            >
                                {category.name}
                            </button>
                        );
                    })}
                </div>

                <div className="flex-row   pb-10  grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full sm:max-w-7xl">
                    {products?.map((product, index) => (
                        <CalendarCard product={product} key={index} />
                    ))}
                </div>

                {products?.length == 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No event yet</div>
                        <div className="text-sm">
                            Be the first to create a event in this community!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default EventView;
