import NumberItem from '@/app/components/community/numbers/NumberItem';
import { AccountCommunityModel } from '@/models/AccountCommunity';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppDetailContext } from '../detail-context';
interface ViewProps {
    handleRefresh: () => void;
    products: AccountCommunityModel[];
}

export default function NumbersContainter({ handleRefresh, products }: ViewProps) {
    const router = useRouter();
    const { appData } = useAppDetailContext();

    const ownerId = appData?.owner?.id;
    const sortedProducts = [
        ...products.filter((p) => p.account?.id === ownerId),
        ...products.filter((p) => p.account?.id !== ownerId)
    ];

    return (
        <>
            <div className="flex-1 p-6   ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 mb-6">
                        <button onClick={() => router.back()} className="p-2 rounded-lg">
                            <ArrowBack className="w-5 h-5 hover:text-gold-400  " />
                        </button>
                        <h2 className="text-3xl font-luxury  font-bold text-gold-400 mb-2">
                            Numbers ({products?.length})
                        </h2>
                    </div>

                    <div>
                        {/* <NumberItem account={appData?.owner} isOwner={true} /> */}
                        {sortedProducts.map((product, index) => (
                            <NumberItem
                                key={index}
                                account={product.account}
                                is_followed={product.is_followed}
                                isOwner={ownerId === product?.account?.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
