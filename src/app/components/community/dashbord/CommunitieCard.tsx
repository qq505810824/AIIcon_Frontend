import { useAppContext } from '@/context/app-context';
import { CommunityModel } from '@/models/Community';
import {
    ClipboardDocumentIcon,
    PencilSquareIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useContext } from 'use-context-selector';
import Modal from '../../base/modal';
import CustomPopover, { HtmlContentProps } from '../../base/popover';
import { ToastContext } from '../../base/toast';
import CommunityFormView from '../form';

interface ViewProps {
    community: CommunityModel;
    handleRefresh?: any
}

export default function CommunitieCard({ community, handleRefresh }: ViewProps) {
    const router = useRouter();
    const { notify } = useContext(ToastContext);
    const { user_id } = useAppContext();
    const [isCopied, setIsCopied] = useState(false);

    const [visibleCreateCommunity, setVisibleCreateCommunity] = useState(false);
    const handleEdit = () => {
        setVisibleCreateCommunity(true);
    };

    const handleClickCommuity = (commuity: any) => {
        router.push(`/communitys/${commuity?.id}`);
    };

    const handleCopyCode = () => {
        copy(community.code || '');
        setIsCopied(true);
        notify({ type: 'success', message: 'Code copied to clipboard' });
        setTimeout(() => setIsCopied(false), 2000);
    };

    const isOwner = () => {
        return community.owner.id == user_id;
    };

    const Operations = (props: HtmlContentProps) => {
        const onMouseLeave = async () => {
            props.onClose?.();
        };
        const onClickSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();
            handleEdit()
        };
        const onClickDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            props.onClick?.();
            e.preventDefault();

            // setShowConfirmDelete(true);
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

                {/* <Divider className="!my-1" /> */}
                <div
                    className="hidden h-10 py-2 px-3 mx-1 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-red-50 transition-colors"
                    onClick={onClickDelete}
                >
                    <TrashIcon className="w-4 h-4 text-red-500" />
                    <span className="text-red-500 text-sm font-medium">Delete</span>
                </div>
            </div>
        );
    };

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-full rounded-xl   hover:shadow-md transition-all duration-200 overflow-hidden"
            >
                <div className="bg-gray-800   rounded-xl shadow-sm border border-gold-400/20 p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className=' flex flex-row  justify-between'>
                        <div className="flex  items-center space-x-3 mb-4">
                            <div className=''>
                                <div
                                    className={`w-10 h-10  md:w-12 md:h-12 bg-${community.theme}-100 rounded-full flex items-center justify-center text-xl`}
                                >
                                    {community.logo}
                                </div>
                            </div>
                            <div className='flex flex-wrap flex-col space-y-1'>
                                <h3 className="font-semibold text-white  ">
                                    {community.name}
                                </h3>
                                <div>
                                    {isOwner() && (
                                        <span className="bg-gold-500  px-2 py-1 rounded-full text-xs">
                                            {'owner'}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-400">
                                    {community.accounts_count} members
                                </p>
                            </div>

                        </div>
                        <div>
                            {isOwner() && (
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
                                        btnClassName="bg-transparent border-none bg-red-500 "
                                        popupClassName="!w-[200px] !p-1"
                                        className="!w-[200px] h-fit !z-20"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                        <div className="p-2 bg-gray-700 rounded-lg">
                            <div className="text-lg font-bold text-blue-600">
                                {community.channels_count}
                            </div>
                            <div className="text-xs">Channels</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                                {community.courses_count}
                            </div>
                            <div className="text-xs ">Courses</div>
                        </div>
                        <div className="p-2 bg-gray-700 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">
                                {community.events_count}
                            </div>
                            <div className="text-xs ">Events</div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Unread posts</span>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                {community.unreadPosts || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Revenue (30d)</span>
                            <span className="text-green-600 font-medium">
                                ${community.revenue || 0}
                            </span>
                        </div>
                    </div>

                    <div className=" ">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <ClipboardDocumentIcon className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-400">
                                    {community.code}
                                </span>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isCopied
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyCode();
                                }}
                            >
                                {isCopied ? 'Copied!' : 'Copy'}
                            </motion.button>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            // setSelectedCommunity(community);
                            // setCurrentView('community');
                            handleClickCommuity(community);
                        }}
                        className={`w-full mt-4 bg-${community.theme}-500 text-white py-2 rounded-lg hover:bg-${community.theme}-600 transition-colors`}
                    >
                        Enter Community
                    </button>
                </div>
            </motion.div>

            <Modal
                isShow={visibleCreateCommunity}
                className="!w-[480px] !max-w-[480px] !p-0 !rounded-2xl"
                wrapperClassName="z-40"
                onClose={() => {
                    setVisibleCreateCommunity(false);
                }}
            >
                <CommunityFormView
                    payload={community}
                    cancel={() => {
                        setVisibleCreateCommunity(false);
                    }}
                    submit={() => {
                        handleRefresh && handleRefresh();
                        setVisibleCreateCommunity(false);
                    }}
                />
            </Modal>
        </>
    );
}
