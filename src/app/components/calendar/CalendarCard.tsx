import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useModalContext } from '@/context/modal-context';
import { useCalendarOperations } from '@/hooks/useCalendarData';
import { CalendarModel } from '@/models/Calendar';
import { formatK } from '@/utils/stringUtil';
import { CalendarIcon } from '@heroicons/react/24/outline';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import Toast from '../base/toast';
import OperationsView from '../common/Views/OperationsView';
interface ViewProps {
    product: CalendarModel;
    handleRefresh?: any;
}

export default function CalendarCard(props: ViewProps) {
    const { product, handleRefresh } = props;
    const router = useRouter();
    const { setShowConfirmDelete } = useModalContext();
    const { activeTab, setActiveTab, permissions } = useAppDetailContext();
    const { deleteCalendar } = useCalendarOperations()
    const handleClick = () => {
        // if (user_id === '') {
        //     setShowConfirmDelete({
        //         payload: {
        //             title: '溫馨提示',
        //             content: '免費註冊以瀏覽全部內容，立即註冊或登入。',
        //             confirmText: '註冊/登入',
        //             cancelText: '取消'
        //         },
        //         onSaveCallback: () => {
        //             router.push('/signin?redirect=' + window.location.href);
        //         },
        //         onCancelCallback() {}
        //     });
        // } else {
        //     router.push(`/calendar/${product.id}`);
        // }
        // router.push(`/calendar/${product.id}`);
        setActiveTab({ name: 'event-detail', meta: { calendar: product } });
    };

    const handleEdit = () => {
        router.push(`/events/${product.id}/edit`)

    }

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {},
            onSaveCallback: async () => {
                const res = await deleteCalendar(product?.id || 0);
                Toast.notify({
                    type: 'success',
                    message: 'Successful!'
                });
                handleRefresh && handleRefresh()
            }
        });
    }

    const showEditCalendar = () => {
        return permissions && permissions.addEvent
    }

    return (
        <>
            <div
                className=" relative bg-gray-800 border border-gold-400/20 rounded-md space-y-2 hover:shadow-lg cursor-pointer  "
                onClick={handleClick}
            >
                <div className="w-full h-[250px] bg-gradient-to-br from-blue-100 to-purple-100">
                    {product.image_url && (
                        <img
                            src={product.image_url}
                            className="w-full h-full object-cover rounded-t-3xlmd"
                            alt=""
                        />
                    )}
                </div>

                {showEditCalendar() &&
                    <div className=' absolute right-1 top-1'>
                        <OperationsView {...{
                            btnClassName: 'bg-white',
                            handleDelete,
                            handleEdit
                        }} />
                    </div>
                }
                <div className="p-2">
                    <div className="flex flex-row space-x-2 justify-between ">
                        <div className="space-y-2 word-break">
                            <p
                                className="text-md font-bold"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    height: '3em' // 根据行高设置最大高度
                                }}
                            >
                                {product.name}
                            </p>
                            <div className="text-sm text-gold-500 flex flex-row items-center">
                                <CalendarIcon className="w-4 mr-2" />
                                {product.from_date} - {product.to_date}
                            </div>
                            <p
                                className="text-sm text-gray-400"
                                style={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    WebkitLineClamp: 2,
                                    height: '3em' // 根据行高设置最大高度
                                }}
                            >
                                {product.description.replace(/<[^>]*>/g, '')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row   my-1 justify-between items-center">
                        <label className="text-sm font-semibold text-gold-500">
                            {product.status}
                        </label>
                        <Typography
                            startDecorator={<RemoveRedEyeOutlinedIcon sx={{ width: 14 }} />}
                            sx={{
                                color: 'gray',
                                fontSize: 14
                            }}
                        >
                            {formatK(product?.view_count || 0)}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    );
}
