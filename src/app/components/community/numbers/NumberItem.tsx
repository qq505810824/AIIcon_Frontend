import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useAppContext } from '@/context/app-context';
import { useContactOperations } from '@/hooks/useAccountContactData';
import { AccountModel } from '@/models/Account';
import { useState } from 'react';

interface ViewProps {
    account: AccountModel;
    isOwner?: boolean;
    is_followed?: boolean;
    handleRefresh?: any;
}

export default function NumberItem({ account, isOwner, is_followed, handleRefresh }: ViewProps) {
    const { user_id } = useAppContext();
    const { appData } = useAppDetailContext();
    const { focus, unfocus } = useContactOperations();
    const [isFocus, setIsFocus] = useState(is_followed);

    const hanldleFocus = async () => {
        setIsFocus(!isFocus);
        if (!isFocus) {
            const res = await focus({
                owner: user_id,
                account_id: account.id,
                source: appData?.name || 'contacts'
            });
        } else {
            await unfocus(user_id, account.id || '');
        }
        handleRefresh && handleRefresh();
    };

    return (
        <>
            <div className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3 mb-1 shadow">
                <div className="flex items-center  gap-3">
                    <img
                        src={account?.avatar || '../../avatar.webp'}
                        alt={account?.name}
                        className="w-10 h-10 rounded-full object-cover border border-gold-400"
                    />
                    <span className="text-md font-semibold text-gold-400 flex-wrap">
                        {account?.name}
                    </span>
                    {isOwner && (
                        <span className="bg-gold-500   ml-2 px-2 py-1 rounded-full text-xs">
                            {'owner'}
                        </span>
                    )}
                </div>
                {user_id != account?.id && (
                    <button
                        className={`px-4 py-1 rounded-full text-sm transition
                                    ${isFocus ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gold-400 text-white hover:bg-gold-500'}`}
                        onClick={() => {
                            // TODO: 关注/取消关注逻辑
                            hanldleFocus();
                        }}
                    >
                        {isFocus ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
        </>
    );
}
