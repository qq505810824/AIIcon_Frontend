

import CommunitieCard from "./CommunitieCard";

export default function CommunitiesLayout() {

    const userCommunities = [
        {
            id: 1,
            name: 'Digital Marketing Pros',
            logo: '🚀',
            members: 1250,
            unreadPosts: 5,
            theme: 'blue',
            tier: 'premium',
            revenue: 2340,
            channels: 8,
            courses: 12,
            events: 3
        },
        {
            id: 2,
            name: 'Creative Designers Hub',
            logo: '🎨',
            members: 890,
            unreadPosts: 12,
            theme: 'purple',
            tier: 'basic',
            revenue: 890,
            channels: 5,
            courses: 8,
            events: 2
        },
        {
            id: 3,
            name: 'Fitness & Wellness',
            logo: '💪',
            members: 2100,
            unreadPosts: 3,
            theme: 'green',
            tier: 'premium',
            revenue: 4200,
            channels: 6,
            courses: 15,
            events: 5
        },
        {
            id: 4,
            name: 'Fitness & Wellness',
            logo: '💪',
            members: 2100,
            unreadPosts: 3,
            theme: 'green',
            tier: 'premium',
            revenue: 4200,
            channels: 6,
            courses: 15,
            events: 5
        }
    ];


    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {userCommunities.map((community, index) => (
                    <CommunitieCard community={community} key={index} />
                ))}
            </div>
        </>
    )
}