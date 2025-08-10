import { cn } from "@/lib/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Divider from "../../base/divider";
import CustomPopover, { HtmlContentProps } from "../../base/popover";

interface ViewProps {
    btnClassName?: string;
    handleEdit?: () => void;
    handleDelete?: () => void;
}

export default function OperationsView({
    btnClassName,
    handleEdit,
    handleDelete
}: ViewProps) {
    const Operations = (props: HtmlContentProps) => {
        const onMouseLeave = async () => {
            props.onClose?.();
        };
        const onClickSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();
            handleEdit && handleEdit();
        };
        const onClickDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();
            handleDelete && handleDelete()
        };
        return (
            <div
                className="relative w-full py-1 bg-white rounded-lg shadow-lg"
                onMouseLeave={onMouseLeave}
            >
                {handleEdit &&
                    <button
                        className="h-10 py-2 px-3 mx-1 flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer w-[96%] transition-colors"
                        onClick={onClickSettings}
                    >
                        <PencilSquareIcon className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700 text-sm font-medium">Edit</span>
                    </button>
                }

                {handleDelete && <>
                    <Divider className="!my-1" />
                    <div
                        className="h-10 py-2 px-3 mx-1 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
                        onClick={onClickDelete}
                    >
                        <TrashIcon className="w-4 h-4 text-red-500" />
                        <span className="text-red-500 text-sm font-medium">Delete</span>
                    </div>
                </>
                }
            </div>
        );
    };

    return (
        <>
            <div className="flex shrink-0">
                <CustomPopover
                    htmlContent={<Operations />}
                    position="br"
                    trigger="click"
                    btnElement={
                        <div className="flex items-center justify-center w-8 h-8  cursor-pointer rounded-full  ">
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
                    btnClassName={cn("bg-transparent border-none", btnClassName)}
                    popupClassName="!w-[200px] !p-1"
                    className="!w-[200px] h-fit !z-20"
                />
            </div>
        </>
    )
}