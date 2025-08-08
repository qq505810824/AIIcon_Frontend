'use client';

import { useAppContext } from '@/context/app-context';
// import { updateTableById } from '@/apis/airtable/AirtableSchema';
import { useModalContext } from '@/context/modal-context';
import { useCommunityDetailData } from '@/hooks/useCommunityData';
import { CommunityModel } from '@/models/Community';
import { useParams, useRouter } from 'next/navigation';
import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type AppContextValue = {
    appData: any;
    submitting?: boolean;
    permissions: {
        isOwner: boolean
        addChannel: boolean;
        addCourse: boolean;
        addEvent: boolean;
    }
    activeTab: {
        name: string;
        meta?: any;
    };
    setActiveTab: any;
    activeSubTab: {
        name: string;
        meta?: any;
    };
    setActiveSubTab: any;
    // handleUpdateTable: (data: any, columns: any) => void;
    // handleDeleteTable: (id: string, onCallback?: any) => void;
};

const AppDetailContext = createContext<AppContextValue>({
    appData: null,
    submitting: false,
    permissions: {
        isOwner: false,
        addChannel: false,
        addCourse: false,
        addEvent: false
    },
    activeTab: { name: '' },
    setActiveTab: () => { },
    activeSubTab: { name: '' },
    setActiveSubTab: () => { }
    // handleUpdateTable: () => {},
    // handleDeleteTable: () => {}
});

export type AppContextProviderProps = {
    share?: boolean;
    children: ReactNode;
};

export const AppDetailContextProvider: FC<AppContextProviderProps> = ({
    share = false,
    children
}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const params = useParams();
    const { setShowConfirmDelete } = useModalContext();
    const { user_id } = useAppContext();

    const { data, isLoading, isError } = useCommunityDetailData(
        Number(params['id']),
        user_id || ''
    );

    const [appData, setAppData] = useState<CommunityModel | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [permissions, setPermissions] = useState<any>({
        addChannel: false,
        addCourse: false,
        addEvent: false,
    })

    const [activeTab, setActiveTab] = useState<any>({ name: 'channels' });
    const [activeSubTab, setActiveSubTab] = useState<any>({ name: '' });

    useEffect(() => { }, []);
    useEffect(() => {
        if (data) {
            // console.log('appData data ', data);
            setAppData(data);
            const isOwner = data.owner.id == user_id
            setPermissions({
                isOwner: isOwner,
                addChannel: isOwner,
                addCourse: isOwner,
                addEvent: isOwner
            })
        }
    }, [data]);

    useEffect(() => {
        // if (appData) console.log('appData', appData);
    }, [appData]);

    // if (!appData) return <Loading type="app" />;

    return (
        <AppDetailContext.Provider
            value={{
                appData,
                submitting,
                permissions,
                activeTab,
                setActiveTab,
                activeSubTab,
                setActiveSubTab
            }}
        >
            {/* <div className="flex flex-col w-full h-full overflow-y-auto">{children}</div> */}
            <div className="">{children}</div>
        </AppDetailContext.Provider>
    );
};

export const useAppDetailContext = () => useContext(AppDetailContext);

export default AppDetailContext;
