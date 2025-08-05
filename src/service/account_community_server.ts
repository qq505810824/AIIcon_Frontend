import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const db = 'account_community';
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

        const { data: contacts } = await supabase
            .from('contacts')
            .select('*')
            .eq('owner', options?.currentUserId);

        // const { data, error } = await query;
        query = query.order(options?.order || 'created_at', {
            ascending: options.direction == 'asc' ? true : false
        });

        const { data, error } = await query;
        console.log(contacts);

        const members = data?.map((item) => ({
            ...item,
            is_followed: contacts?.some((c) => c.account === item.account.id)
        }));

        if (error) {
            throw error;
        }

        return { data: members, error: null };
    } catch (error) {
        console.error('获取应用列表失败:', error);
        return { data: null, error };
    }
};
