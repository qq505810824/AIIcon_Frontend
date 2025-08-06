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
        const tasks = [supabase.from(db).insert([appData]).select()];

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
        const { data, error } = await supabase
            .from(db)
            .delete()
            .eq('owner', owner)
            .eq('account', account);

        if (error) {
            throw error;
        }
        return { success: true };
    } catch (error) {
        console.error('删除应用失败:', error);
        return { success: false, error };
    }
};

export const statisticsApp = async (options: any) => {
    try {
        // 总数
        const { count: totalCount } = await supabase
            .from('contacts')
            .select('id', { count: 'exact', head: true })
            .eq('owner', options?.user_id);

        // 一周增量
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const { data: weekContacts } = await supabase
            .from('contacts')
            .select('created_at')
            .eq('owner', options?.user_id)
            .gte('created_at', oneWeekAgo);

        // 按天统计
        const dateMap: Record<string, number> = {};
        weekContacts?.forEach((c: any) => {
            const date = c.created_at.slice(0, 10);
            dateMap[date] = (dateMap[date] || 0) + 1;
        });

        const dates: string[] = [];
        const counts: number[] = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            const dateStr = d.toISOString().slice(0, 10);
            dates.push(dateStr);
            counts.push(dateMap[dateStr] || 0);
        }

        return {
            data: {
                totalCount: totalCount || 0,
                weekCount: weekContacts?.length || 0,
                lineChartData: dates.map((date, idx) => ({
                    date,
                    count: counts[idx]
                }))
            }
        };
    } catch (error) {
        return { error };
    }
};
