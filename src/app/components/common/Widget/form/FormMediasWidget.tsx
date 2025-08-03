import MediasContainter from '@/app/(communityLayout)/medias/MediaContainter';
import Modal from '@/app/components/base/modal';
import { useEffect, useState } from 'react';

export default function FormMediasWidget(props: any) {
    const { name, formData, required, value, onChange, disabled } = props;
    const [showModal, setShowModal] = useState(false);
    const [selectedMedias, setSelectedMedias] = useState<any[]>(value || []);

    // console.log('props', props);
    useEffect(() => {
        // console.log('formData', name);
        // console.log('value', value);
        if (value) {

        }
    }, [value]);

    // 打开选择媒体弹窗
    const onAddMedia = () => {
        setShowModal(true);
    };

    // 确认选择媒体
    const handleConfirmMedias = (medias: any[]) => {
        setSelectedMedias(medias);
        // onChange && onChange(medias); // 通知表单
        // const ids = medias.map(m => m.id);
        // onChange && onChange(ids); // 只保存 id 数组
        const idNameArr = medias.map(m => ({ id: m.id, name: m.name, city: m.city }));
        onChange && onChange(idNameArr); // 只保存 id 和 name 数组
        setShowModal(false);
    };

    return (
        <div>
            <div className='flex flex-row items-center justify-between'>
                <div className="flex flex-row items-center">
                    <label className="block text-md font-medium text-[#1a202c]">{props.label}</label>
                    {required && (
                        <label className="block text-md font-medium text-[#e53e3e] ml-2">*</label>
                    )}
                </div>
                <div onClick={onAddMedia}>
                    <label className='underline text-blue-500 cursor-pointer'>+ Add From Media Database</label>
                </div>
            </div>

            {/* 显示已选择的媒体名称 */}
            <div className="mt-2 space-y-1">
                {/* {selectedMedias.map((media: any) => (
                    <div key={media.id} className="text-sm text-gray-700">
                        {media.name}
                    </div>
                ))} */}
                {Object.entries(
                    selectedMedias.reduce((acc: Record<string, any[]>, media: any) => {
                        const city = media.city || 'Unknown';
                        acc[city] = acc[city] || [];
                        acc[city].push(media);
                        return acc;
                    }, {})
                ).map(([city, medias], index) => (
                    <div key={city} className="text-sm text-gray-700">
                        {index + 1}.   {city}, {medias.length} media channel
                    </div>
                ))}
            </div>

            {/* 全屏选择媒体弹窗 */}
            {showModal && (
                <Modal
                    isShow={showModal}
                    className="!w-full !max-w-full !h-full !rounded-none p-0"
                    wrapperClassName="z-50 "
                    onClose={() => setShowModal(false)}
                >
                    <MediasContainter
                        onConfirm={handleConfirmMedias}
                        hasSelectedMedias={selectedMedias}
                    />
                </Modal>
            )}
        </div>
    );
}
