import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useRouter } from 'next/navigation';
import NumberItem from '../numbers/NumberItem';

interface ViewProps {
    product: any
    handleRefresh?: any;
}

export default function ContactCard({ product, handleRefresh }: ViewProps) {
    const router = useRouter();
    const { activeTab, setActiveTab } = useAppDetailContext();

    if (product?.account) {
        return <NumberItem account={product.account} is_followed={true} handleRefresh={handleRefresh} />
    }

    return (
        <>
            <div
                onClick={() => {
                    // handleClickCourse(course)
                    // setSelectedCourse(course);
                    // setActiveTab({ name: 'course-detail', meta: { course } });
                }}
                className="bg-gray-800 p-2 card-hover border border-gold-400/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
                {Object.keys(product?.meta).map((key, index) => {
                    return (
                        <div key={index}><label className='text-gray-300 mr-2'>{key}:</label> {product?.meta[key]}</div>
                    )
                })}
            </div>
        </>
    );
}
