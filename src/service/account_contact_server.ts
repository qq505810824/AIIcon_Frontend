import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'contacts';
export const getAllApps = async (options?: any) => {
    try {
        // console.log('options', options);

        let query = supabase.from(db).select('*,account(id,name,avatar)');
        if (options && options.community_id) {
            query = query.eq('community', options.community_id);
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

        // const { data, error } = await query;
        query = query.order(options?.order || 'created_at', {
            ascending: options.direction == 'asc' ? true : false
        });

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

export const createApp = async (appData: any) => {
    try {
        const tasks = [
            supabase.from(db).insert([appData]).select()
        ];

        const [createResult] = await Promise.all(tasks);
        // console.log('collectResult', collectResult);

        return {
            success: true,
            data: {
                ...createResult.data
            },
            error: null
        };
    } catch (error) {
        console.error('创建应用失败:', error);
        return { success: false, error };
    }
};

export const deleteApp = async (owner: string, account: string) => {
    try {

        const { data, error } = await supabase.from(db).delete().eq('owner', owner).eq('account', account);

        if (error) {
            throw error;
        }
        return { success: true };
    } catch (error) {
        console.error('删除应用失败:', error);
        return { success: false, error };
    }
};