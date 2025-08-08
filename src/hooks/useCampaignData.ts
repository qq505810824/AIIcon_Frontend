import { CampaignModel } from '@/models/Campaign';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    getRandomApps,
    searchApp,
    statisticsApp,
    updateApp
} from '@/service/campaign_server';
import moment from 'moment';

import useSWR from 'swr';

export const showCampaignValues = (item: CampaignModel) => {
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

// 自定义 hook 使用 SWR 获取所有应用
export const useCampaignData = (options: any) => {
    const { data, error, isLoading, mutate } = useSWR(
        'campaigns_' + options?.user_id,
        () => appsFetcher(options),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 60000 // 1分钟内不重复请求
        }
    );

    return {
        data: data as CampaignModel[],
        isLoading,
        isError: error,
        mutate
    };
};

export const useAllCampaignData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('campaigns', () => appsFetcher(options), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as CampaignModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 自定义 hook 使用 SWR 获取所有应用
export const randomCampaignData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, getRandomApps, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data?.data as CampaignModel[],
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

export const useCampaignDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? 'detail_campaign_' + id : null,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CampaignModel | undefined,
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

export const useCampaignDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_campaign_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CampaignModel | undefined,
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

export const useCampaignStatisticsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_Campaign_statistics',
        () => appStatisticsFetcher(),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as CampaignModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useCampaignOperations = () => {
    const addCampaign = async (appData: Omit<CampaignModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateCampaign = async (id: number, updatedData: Partial<CampaignModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteCampaign = async (id: number, community_id?: number) => {
        return await deleteApp(id, community_id);
    };

    const searchCampaign = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useCampaignData(options);
        });
    };
    return { addCampaign, updateCampaign, deleteCampaign, searchCampaign, mutate };
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
