import { CommunityModel } from '@/models/Community';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    getJoinApps,
    getRandomApps,
    joinApp,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/community_server';
import moment from 'moment';

import useSWR from 'swr';

// 定义应用数据类型

export enum EnumRegion {
    mo = '澳門',
    hk = '香港'
}

export const showCommunityValues = (item: CommunityModel) => {
    let status = '';

    return {
        ...item,
        status: status,
        created_at: moment(item.created_at).fromNow(),
        updated_at: moment(item.updated_at).fromNow()
    };
};

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

const appsJoinFetcher = async (options?: {}) => {
    const { data, error } = await getJoinApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useCommunityData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('communitys', () => appsFetcher(options), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as CommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useJoinCommunityData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'join_communitys_' + options?.user_id,
        () => appsJoinFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as CommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useMyCommunityData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'communitys_' + options?.user_id,
        () => appsFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as CommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 自定义 hook 使用 SWR 获取所有应用
export const randomCommunityData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, getRandomApps, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data?.data as CommunityModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (id: number, accountId?: string) => {
    const { data, error } = await getAppDetail(id, accountId);
    if (error) throw error;
    return data || [];
};

export const useCommunityDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_community_' + id,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommunityModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailByIdFetcher = async (id: number) => {
    const { data, error } = await getAppDetailById(id);
    if (error) throw error;
    return data || [];
};

export const useCommunityDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_community_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommunityModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

const appStatisticsFetcher = async () => {
    const { data, error } = await statisticsApp();
    if (error) throw error;
    return data || [];
};

export const useCommunityStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_community_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CommunityModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useCommunityOperations = () => {
    const addCommunity = async (appData: Omit<CommunityModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const joinCommunity = async (data: any) => {
        return handleAppOperation(async () => {
            return await joinApp(data);
        });
    };

    const updateCommunity = async (id: number, updatedData: Partial<CommunityModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteCommunity = async (id: number) => {
        return await deleteApp(id);
    };

    const searchCommunity = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useCommunityData(options);
        });
    };
    return {
        addCommunity,
        updateCommunity,
        deleteCommunity,
        searchCommunity,
        mutate,
        joinCommunity
    };
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
