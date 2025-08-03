import { useEffect, useState } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

export default function FormTagWidget(props: any) {
    const { label, required, value = [], onChange } = props;
    const [tags, setTags] = useState<string[]>(value);

    useEffect(() => {
        if (value) {
            setTags(value)
        }
        // console.log('value', value, tags);

    }, [value, tags])

    const handleChange = (newTags: string[]) => {
        setTags(newTags);
        onChange && onChange(newTags);
    };

    return (
        <div>
            <div className='flex flex-row items-center justify-between mb-2'>
                <div className="flex flex-row items-center">
                    <label className="block text-md font-medium text-[#1a202c]">{label}</label>
                    {required && (
                        <label className="block text-md font-medium text-[#e53e3e] ml-2">*</label>
                    )}
                </div>
            </div>
            <TagsInput
                value={tags}
                onChange={handleChange}
                inputProps={{
                    placeholder: 'Enter tag and press Enter'
                }}
            />
        </div>
    );
}
