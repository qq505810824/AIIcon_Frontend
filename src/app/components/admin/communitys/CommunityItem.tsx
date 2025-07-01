import { useModalContext } from '@/context/modal-context';
import { usePromptOperations } from '@/hooks/usePromptData';
import { CommunityModel } from '@/models/Community';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/joy';
import { useRouter } from 'next/navigation';
interface ViewProps {
    product: CommunityModel;
    onDelete: () => void;
    onUpdataStatus: any;
}

export default function CommunityItem(props: ViewProps) {
    const { product, onDelete, onUpdataStatus } = props;
    const router = useRouter();
    const { updatePrompt } = usePromptOperations();
    const { setShowConfirmDelete } = useModalContext();
    const handleClick = () => {
        if (product) {
            window.open(`/community/${product.id}`, '_blank');
        }
    };

    const handleEdit = () => {
        if (product) router.push(`/admin/communitys/${product.id}/edit`);
    };

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {
                title: '刪除提示',
                content: '確定刪除嗎？'
            },
            onSaveCallback: () => {
                onDelete();
            }
        });
    };

    const handleStatus = (status: string) => {
        setShowConfirmDelete({
            payload: {
                title: '提示',
                content: '確定操作？'
            },
            onSaveCallback: () => {
                onUpdataStatus(product.id, status);
            }
        });
    };
    return (
        <>
            <tr>
                <td>
                    <Tooltip title={product.name}>
                        <div
                            className="text-ellipsis overflow-hidden text-blue-500 underline cursor-pointer"
                            onClick={handleClick}
                        >
                            {product.name}
                        </div>
                    </Tooltip>
                </td>
                {/* <td>{product.category}</td> */}

                <td>{product.channels_count}</td>
                <td>{product.courses_count}</td>
                <td>{product.events_count}</td>
                <td>{product.publish ? '是' : '否'} </td>
                <td className={``}>
                    {product?.owner?.name}
                </td>
                <td>{product.updated_at}</td>
                <td>
                    <div className="flex flex-row items-center overflow-hidden space-x-2">
                        <label
                            className="flex flex-row items-center text-blue-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-xs"
                            onClick={handleEdit}
                        >
                            <PencilIcon className="w-3 h-3 mr-1" /> 编辑
                        </label>
                        <label
                            className="flex flex-row items-center text-red-500 cursor-pointer whitespace-nowrap px-2 py-1 rounded-md bg-red-100 hover:bg-red-200 text-xs"
                            onClick={handleDelete}
                        >
                            <TrashIcon className="w-3 h-3 mr-1" /> 刪除
                        </label>
                    </div>
                </td>
            </tr>
        </>
    );
}
