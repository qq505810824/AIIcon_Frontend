import { useAppContext } from '@/context/app-context';
import { useCommunityOperations } from '@/hooks/useCommunityData';
import { CommunityModel } from '@/models/Community';
import { useState } from 'react';

interface ViewProps {
    payload: any;
    submit: () => void;
    cancel: any;
}

export default function CommunityFormView({ payload, submit, cancel }: ViewProps) {
    const { addCommunity } = useCommunityOperations();
    const { user_id } = useAppContext();
    const [submitting, setSubmitting] = useState(false);

    const [data, setData] = useState<CommunityModel>({
        name: '',
        description: '',
        theme: 'green',
        logo: '💪',
        owner: user_id,
        publish: true,
        channels_count: 0,
        courses_count: 0,
        events_count: 0,
        accounts_count: 1
    });

    // 在组件顶部定义可选 emoji
    const logoEmojis = [
        '💪', // 力量
        '🎨', // 艺术
        '🚀', // 火箭
        '🌟', // 星星
        '📚', // 书本
        '🤖', // 机器人
        '🎵', // 音乐
        '🧑‍💻', // 程序员
        '🏆', // 奖杯
        '🌈' // 彩虹
    ];

    // 在组件顶部定义可选颜色
    const themeColors = [
        'green', // green
        'blue', // blue
        'orange', // orange
        'red', // red
        'purple', // purple
        'teal', // teal
        'yellow', // yellow
        'indigo', // indigo
        'pink' // pink
        // 'slate' // slate
    ];

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 阻止表单自动跳转和刷新
        console.log('data', data);
        console.log('payload', payload);
        setSubmitting(true);
        const res = await addCommunity({
            ...payload,
            ...data
        });

        setSubmitting(false);
        submit();
        console.log('res', res);
    };

    return (
        <>
            <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold  mb-4">Create Community</h4>
                <form onSubmit={onSubmit} className=" ">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Community Name</label>
                            <input
                                type="text"
                                value={data.name}
                                name={'name'}
                                required={true}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                placeholder="e.g. hub"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Logo</label>
                            <div className="flex flex-wrap gap-2">
                                {logoEmojis.map((emoji) => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-2xl transition-all
                    ${data.logo === emoji ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}
                `}
                                        onClick={() => setData({ ...data, logo: emoji })}
                                        aria-label={emoji}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Theme</label>
                            <div className="flex flex-wrap gap-2">
                                {themeColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${data.theme === color ? 'border-white ring-2 ring-offset-2 ring-blue' : 'border-gray-200'}`}
                                        style={{ background: color }}
                                        onClick={() => setData({ ...data, theme: color })}
                                        aria-label={color}
                                    >
                                        {data.theme === color && (
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                name={'description'}
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                placeholder="What is this community for?"
                                rows={3}
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                disabled={submitting}
                                onClick={cancel}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Comfirm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
