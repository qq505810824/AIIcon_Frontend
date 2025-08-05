import MediaLayout from '@/app/components/community/medias/MediaLayout';
import { MediaModel } from '@/models/Media';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
interface ViewProps {
    handleRefresh: () => void;
    medias: MediaModel[];
    onConfirm: any;
    hasSelectedMedias?: MediaModel[];
}

export default function MediaView({
    handleRefresh,
    medias,
    hasSelectedMedias,
    onConfirm
}: ViewProps) {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [industry, setIndustry] = useState('');
    const [selectedMedias, setSelectedMedias] = useState<string[]>([]);

    // 初始化 selectedMedias
    useEffect(() => {
        if (hasSelectedMedias && hasSelectedMedias.length > 0) {
            setSelectedMedias(hasSelectedMedias.map((m: any) => m.id));
        }
    }, [hasSelectedMedias]);

    // 获取所有可选项
    const categories = Array.from(new Set(medias.map((m) => m.category).filter(Boolean)));
    const cities = Array.from(new Set(medias.map((m) => m.city).filter(Boolean)));
    const industries = Array.from(new Set(medias.map((m) => m.industry).filter(Boolean)));

    // 过滤后的数据
    const filteredMedias = medias.filter(
        (m) =>
            (!search || m.name?.toLowerCase().includes(search.toLowerCase())) &&
            (!category || m.category === category) &&
            (!city || m.city === city) &&
            (!industry || m.industry === industry)
    );

    // 添加/移除
    const handleToggleCampaign = (id: string) => {
        setSelectedMedias((prev) =>
            prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
        );
    };

    const onSubmit = () => {
        const addedMedias = medias.filter((m: any) => selectedMedias.includes(m.id));
        console.log('已添加到Campaign的数据:', addedMedias);
        // 你可以在这里弹窗或展示 addedMedias
        onConfirm && onConfirm(addedMedias);
    };
    return (
        <>
            <div className="flex-1 p-6  bg-gray-900 text-white ">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center  flex-wrap space-y-2 mb-8">
                        <div className=" ">
                            <h2 className="text-3xl font-luxury  font-bold text-gold-400 mb-2">
                                Media Database
                            </h2>
                            <p className="text-gray-300">
                                Explore media outlets by city and industry
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                onSubmit();
                            }}
                            className="bg-gold-500 text-white text-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2 whitespace-nowrap"
                        >
                            <span>Confirm</span>
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-2 rounded border border-gold-400/20 bg-gray-900 text-gray-300"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-3 py-2 rounded border border-gold-400/20   bg-gray-900 text-gray-300"
                        >
                            <option value="">All Media Type</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="px-3 py-2 rounded border border-gold-400/20 bg-gray-900 text-gray-300"
                        >
                            <option value="">All Cities</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="px-3 py-2 rounded border border-gold-400/20 bg-gray-900 text-gray-300"
                        >
                            <option value="">All Industries</option>
                            {industries.map((i) => (
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <MediaLayout
                        medias={filteredMedias}
                        selectedMedias={selectedMedias}
                        onToggleCampaign={handleToggleCampaign}
                    />
                </div>
            </div>
        </>
    );
}
