import { CommunityModel } from '@/models/Community';
import CommunitieCard from './CommunitieCard';
import NewAssignment from './NewCommunityCard';

interface ViewProps {
    communities: CommunityModel[];
    handleRefresh?: any;
}

export default function CommunitiesLayout({ communities, handleRefresh }: ViewProps) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <NewAssignment handleRefresh={handleRefresh} />
                {communities?.map((community, index) => (
                    <CommunitieCard
                        community={community}
                        key={index}
                        handleRefresh={handleRefresh}
                    />
                ))}
            </div>
        </>
    );
}
