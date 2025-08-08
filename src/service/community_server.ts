import { CommunityModel } from '@/models/Community';
import { createClient } from '@supabase/supabase-js';
import _ from 'lodash';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'communitys';
export const getAllApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.from(db).select('*,owner(id,name)');

        if (options && options.user_id) {
            query = query.eq('owner', options.user_id);
        }

        if (options && options.category) {
            query = query.eq('category', options.category);
        }
        if (options && options.status) {
            query = query.or(`status.like.%${options?.status || ''}`);
        }
        if (options && options.region) {
            query = query.eq(`region`, options.region);
        }
        query = query.or(
            `name.ilike.%${options?.keyword || ''}%,description.ilike.%${options?.keyword || ''}%`
        );

        // const { data, error } = await query;
        query = query.order(options?.order || 'created_at', {
            ascending: options.direction == 'asc' ? true : false
        });

        const { data, error } = await query;

        // const { data, error } = await supabase
        //     .from(db)
        //     .select('*')
        //     .or(`status.like.%${options?.status || ''}`)
        //     .order(options?.order || 'created_at', {
        //         ascending: options.direction == 'asc' ? true : false
        //     });

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getJoinApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.from('account_community').select('*,account(*),community(*)');

        if (options && options.user_id) {
            query = query.eq('account', options.user_id);
        }

        // const { data, error } = await query;
        query = query.order(options?.order || 'created_at', {
            ascending: options.direction == 'asc' ? true : false
        });

        const { data, error } = await query;

        // const { data, error } = await supabase
        //     .from(db)
        //     .select('*')
        //     .or(`status.like.%${options?.status || ''}`)
        //     .order(options?.order || 'created_at', {
        //         ascending: options.direction == 'asc' ? true : false
        //     });

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getRandomApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.rpc('random_communitys', options);
        const { data, error } = await query;
        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const getAppDetail = async (id: number, accountId?: string) => {
    try {
        // 构建查询任务数组
        const tasks = [
            // supabase.rpc('increment_view', { row_id: id }),
            supabase.from(db).select('*,owner(id,name,avatar)').eq('id', id).single()
        ];

        // 如果有用户ID，添加收藏状态查询
        if (accountId) {
            // tasks.push(
            //     supabase
            //         .from('account_community')
            //         .select('*')
            //         .eq('community_id', id)
            //         .eq('account_id', accountId)
            //     // .single()
            // );
        }

        // 并行执行所有操作
        const [detailResult, collectResult] = await Promise.all(tasks);
        // console.log('collectResult', collectResult);

        if (detailResult.error) {
            throw detailResult.error;
        }

        return {
            data: {
                ...detailResult.data,
                is_collected: collectResult ? collectResult?.data?.length > 0 : false
            },
            error: null
        };
    } catch (error) {
        console.error('获取应用详情失败:', error);
        return { data: null, error };
    }
};

export const getAppDetailById = async (id: number) => {
    try {
        // 构建查询任务数组
        const { data, error } = await supabase.from(db).select('*').eq('id', id).single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('获取应用详情失败:', error);
        return { data: null, error };
    }
};

export const createApp = async (appData: Omit<CommunityModel, 'id'>) => {
    try {
        const { data, error } = await supabase.from(db).insert([appData]).select();

        if (error) {
            throw error;
        }

        // 2. 创建 account_community 关系
        if (data && data.length > 0) {
            const communityId = data[0].id;
            const accountId = appData.owner;
            const { error: relError } = await supabase
                .from('account_community')
                .insert([{ account: accountId, community: communityId }]);
            if (relError) {
                throw relError;
            }
        }

        return { success: true, data };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};

export const updateApp = async (id: number, appData: Partial<CommunityModel>) => {
    try {
        let result;

        const { data, error } = await supabase.from(db).update(appData).eq('id', id).select();

        if (error) throw error;
        result = { data, error: null };

        return { success: true, data: result.data };
    } catch (error) {
        console.error('更新应用失败:', error);
        return { success: false, error };
    }
};

export const deleteApp = async (id: number) => {
    try {
        // 先删除关系表中的数据
        const { error: relError } = await supabase
            .from('account_community')
            .delete()
            .eq('community', id);

        if (relError) {
            throw relError;
        }

        const { data, error } = await supabase.from(db).delete().eq('id', id);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('删除应用失败:', error);
        return { success: false, error };
    }
};

export const searchApp = async (options?: any) => {
    try {
        let query = supabase.from(db).select('*');
        // console.log('options', options);

        if (options && options.category) {
            query = query.eq('category', options.category);
        }
        if (options && options.code) {
            query = query.eq('code', options.code);
        }
        if (options && options.status) {
            query = query.or(`status.like.%${options?.status || ''}`);
        }
        query = query.or(
            `name.ilike.%${options?.keyword || ''}%,description.ilike.%${options?.keyword || ''}%`
        );

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return { data, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};

export const joinApp = async (appData: any) => {
    if (appData?.account == appData?.owner) {
        return { success: false, error: 'You have joined!' };
    }
    try {
        const { data, error } = await supabase.rpc('join_community', {
            p_account: appData.account,
            p_community: appData.community,
            p_owner: appData.owner,
            p_data: _.omit(appData, 'owner') // 或 _.omit(appData, 'owner')
        });
        // console.log('data', data);

        if (error) {
            return { success: false, error };
        }
        // data 是数组，取第一个元素作为对象返回
        if (Array.isArray(data) && data.length > 0) {
            return data[0];
        }
        return { success: true, data };
        // const { data: detailData } = await supabase
        //     .from('account_community')
        //     .select('*')
        //     .eq('account', appData?.account)
        //     .eq('community', appData?.community);
        // if (detailData && detailData.length > 0) {
        //     return { success: false, error: 'You have joined!' };
        // }

        // const tasks = [
        //     supabase.rpc('increment_community_account', { community_id: appData?.community }),
        //     supabase
        //         .from('account_community')
        //         .insert([_.omit(appData, 'owner')])
        //         .select()
        // ];

        // // 并行执行所有操作
        // const [, collectResult] = await Promise.all(tasks);
        // // console.log('collectResult', collectResult);

        // return {
        //     data: {
        //         ...collectResult.data
        //     },
        //     error: null
        // };

        // const { data, error } = await supabase.from("account_community").insert([_.omit(appData, "owner")]).select();
        // if (error) {
        //     throw error;
        // }
        // return { success: true, data };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};

export const statisticsApp = async () => {
    try {
        // const { data, error } = await supabase
        //     .from(db)
        //     .select('"COUNT"(focus) as total_focus') // 使用 head: true 来获取单个结果（如果有多个聚合列）
        //     .single(); // 使用 .single() 来确保结果是一个对象而不是数组

        const { data, error } = await supabase.rpc('get_prompts_count');
        // const { data, error } = await supabase
        //     .rpc('execute_sql', {
        //         query: `
        //         SELECT
        //           COUNT(focus) AS total_focus
        //         FROM ${db}
        //       `
        //     });
        if (error) {
            console.log('error', error);

            throw new Error(`Database error: ${error.message}, Code: ${error.code}`);
        }

        // Extract the statistical results
        // const totalCollect = data ? Number(data.total_collect) : 0;

        return { data: data, error: null };
    } catch (error) {
        console.error('Failed to count the total number of app collections:', error);
        return { data: null, error: error instanceof Error ? error.message : String(error) };
    }
};
