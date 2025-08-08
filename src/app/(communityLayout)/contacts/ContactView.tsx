import ContactLayoutView from '@/app/components/community/contacts/ContactLayout';
import ImportFromExeclButton from '@/app/components/community/networks/ImportFromExeclButton';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface ViewProps {
    handleRefresh?: any;
    data: any;
}

export default function ContactView({ handleRefresh, data }: ViewProps) {
    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const router = useRouter();
    const handleCreatCommunity = () => {
        setVisibleCreateCommunity(true);
    };
    return (
        <>
            <div className="flex-1 p-6  ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 ">
                        <button onClick={() => router.back()} className="p-2 rounded-lg">
                            <ArrowBack className="w-5 h-5 hover:text-gold-400  " />
                        </button>
                    </div>
                    <div className="flex flex-row items-center  justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-luxury font-bold text-gold-400 mb-2">
                                Contacts
                            </h1>
                            <p className="text-gray-300">
                                Convert connections into perpetual capital
                            </p>
                        </div>
                        <div>
                            <ImportFromExeclButton handleRefresh={handleRefresh} />
                        </div>
                    </div>

                    <ContactLayoutView data={data} handleRefresh={handleRefresh} />
                </div>
            </div>
        </>
    );
}
