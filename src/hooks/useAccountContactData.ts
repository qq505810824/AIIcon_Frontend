import { AccountCommunityModel } from '@/models/AccountCommunity';
import {
    createApp,
    deleteApp,
    getAllApps,
    importApp,
    statisticsApp
} from '@/service/account_contact_server';

import useSWR from 'swr';

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useAccountCommunityData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'AccountCommunitys_' + options?.community_id,
        () => appsFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as AccountCommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useMyContactsData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'contacts_' + options?.user_id,
        () => appsFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as AccountCommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appStatisticsFetcher = async (option?: any) => {
    const { data, error } = await statisticsApp(option);
    if (error) throw error;
    return data || [];
};

export const useContactStatisticsData = (options?: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_contact_statistics_' + options?.user_id,
        () => appStatisticsFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000 // 1分钟内不重复请求
        }
    );
    return {
        data: data as any,
        isLoading,
        isError: error,
        mutate
    };
};

export const useContactOperations = () => {
    const focus = async (appData: any) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const unfocus = async (id: string, accountId: string) => {
        return handleAppOperation(async () => {
            return await deleteApp(id, accountId);
        });
    };

    const importData = async (appData: any) => {
        return handleAppOperation(async () => {
            return await importApp(appData);
        });
    };
    return { focus, unfocus, importData };
};

// 处理应用操作的通用函数
const handleAppOperation = async (operation: () => Promise<any>) => {
    try {
        const { data, error } = await operation();
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
