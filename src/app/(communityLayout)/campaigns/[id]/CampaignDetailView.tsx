import Divider from '@/app/components/base/divider';
import Loading from '@/app/components/base/loading';
import CustomPopover, { HtmlContentProps } from '@/app/components/base/popover';
import Toast from '@/app/components/base/toast';
import ContentView from '@/app/components/common/Views/ContentView';
import { useModalContext } from '@/context/modal-context';
import { useCampaignOperations } from '@/hooks/useCampaignData';
import { CampaignModel } from '@/models/Campaign';
import { faCalendar, faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowBack } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface ViewProps {
    product: CampaignModel;
}

export default function CampaignDetailView({ product }: ViewProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { deleteCampaign } = useCampaignOperations();
    const { setShowConfirmDelete } = useModalContext();

    useEffect(() => {
        if (product) {
            // 可以做一些初始化操作
        }
    }, [product]);

    const statusLable = () => {
        if (!product) return 'planning';
        const now = new Date();
        const start = new Date(product.start_at || '');
        const end = new Date(product.end_at || '');

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

    const handleEdit = () => {
        router.push(`/campaigns/${product.id}/edit`);
    };
    const Operations = (props: HtmlContentProps) => {
        const onMouseLeave = async () => {
            props.onClose?.();
        };
        const onClickSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();
            handleEdit();
        };
        const onClickDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();

            setShowConfirmDelete({
                payload: {},
                onSaveCallback: async () => {
                    const res = await deleteCampaign(product?.id || 0);
                    Toast.notify({
                        type: 'success',
                        message: 'Successful!'
                    });
                    router.push('/campaigns');
                }
            });
        };
        return (
            <div
                className="relative w-full py-1 bg-white rounded-lg shadow-lg"
                onMouseLeave={onMouseLeave}
            >
                <button
                    className="h-10 py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer w-[96%] transition-colors"
                    onClick={onClickSettings}
                >
                    <PencilSquareIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm font-medium">Edit</span>
                </button>

                <Divider className="!my-1" />
                <div
                    className="h-10 py-2 px-3 mx-1 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
                    onClick={onClickDelete}
                >
                    <TrashIcon className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 text-sm font-medium">Delete</span>
                </div>
            </div>
        );
    };

    if (!product) return <Loading type="app" />;

    return (
        <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto px-2 py-4 sm:px-6 sm:py-8">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-2 ">
                        <button onClick={() => router.back()} className="p-2 rounded-lg">
                            <ArrowBack className="w-5 h-5 hover:text-gold-400  " />
                        </button>
                        <h1 className="text-xl sm:text-3xl font-bold">{product?.name || '--'}</h1>
                        <div
                            className={`flex items-center space-x-1 rounded-full px-2 py-1 ${statusStyle}`}
                        >
                            <span className="text-xs">{statusLable()}</span>
                        </div>
                    </div>
                    <div className="flex shrink-0">
                        <CustomPopover
                            htmlContent={<Operations />}
                            position="br"
                            trigger="click"
                            btnElement={
                                <div className="flex items-center justify-center w-8 h-8 border border-gold-400/20  cursor-pointer rounded-full  ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-gold-600 hover:text-gold-400"
                                    >
                                        <circle cx="8" cy="3" r="1.5" />
                                        <circle cx="8" cy="8" r="1.5" />
                                        <circle cx="8" cy="13" r="1.5" />
                                    </svg>
                                </div>
                            }
                            btnClassName="bg-transparent border-none bg-red-500 "
                            popupClassName="!w-[200px] !p-1"
                            className="!w-[200px] h-fit !z-20"
                        />
                    </div>
                </div>

                <div className="flex items-center mt-4 ">
                    <span className="text-sm sm:text-md text-gray-300">{product.description}</span>
                </div>
                <div className="flex flex-col mt-4 text-sm space-y-2 text-gray-300">
                    <span>
                        {' '}
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                        {product.location}
                    </span>
                    <span>
                        {' '}
                        <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                        {product.start_at} - {product.end_at}
                    </span>
                    <span>
                        {' '}
                        <FontAwesomeIcon icon={faUsers} className="mr-2" />
                        {product.people || 0} Projected reach
                    </span>

                    {product.press_release && (
                        <div className="mb-6">
                            <span className="font-semibold text-gray-300">Press Release:</span>
                            <ContentView content={product?.press_release || ''} />
                        </div>
                    )}
                    {product.files_url && (
                        <div className="mb-6">
                            <span className="font-semibold text-gray-300">Images:</span>
                            <div className="mt-2  space-x-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {/* 假设 files_url 是图片链接数组或逗号分隔字符串 */}
                                {(Array.isArray(product.files_url)
                                    ? product.files_url
                                    : String(product.files_url).split(',')
                                ).map((url: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={url}
                                        alt="展会图片"
                                        className=" object-cover rounded border"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {product.medias && product.medias.length > 0 && (
                        <div className="mb-6">
                            <span className="font-semibold text-gray-300">Promoto Channel:</span>
                            <div className="mt-2 flex flex-col flex-wrap gap-2">
                                {product.medias.map((media: any, idx: number) => {
                                    return (
                                        <span
                                            key={idx}
                                            className="text-gray-400  text-sm font-medium  "
                                        >
                                            {idx + 1}: {media.name || '--'}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
