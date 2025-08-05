import { AccountCommunityModel } from '@/models/AccountCommunity';
import { getAllApps } from '@/service/account_community_server';

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
