import NetworkLayoutView from '@/app/components/community/networks/NetworkLayoutView';
import { useState } from 'react';
interface ViewProps {
    handleRefresh: () => void;
    data: any;
}

export default function NetworkView({ handleRefresh, data }: ViewProps) {
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const handleCreatCommunity = () => {
        setVisibleCreateCommunity(true);
    };
    return (
        <>
            <div className="flex-1 p-6  ">
                <div className="max-w-7xl mx-auto">
                    <NetworkLayoutView data={data} />
                </div>
            </div>
        </>
    );
}
