import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

interface ViewProps {
    key: string;
    initialValue?: any;
    setValue?: any;
}

export default function FormEditor(props: any) {
    // const {
    //     key,
    //     initialValue,
    //     setValue
    // } = props

    const { name, label, required, value, onChange, disabled } = props;

    const [initValue, setInitValue] = useState('');
    const [isInit, setIsInit] = useState(false);
    const [blobToBase64Map, setBlobToBase64Map] = useState<{ [blobUri: string]: string }>({});
    useEffect(() => {
        // console.log('formData', name);
        // console.log('editor value', value);
        if (value && !isInit) {
            setInitValue(value);
            setIsInit(true);
        }
        if (value == null) {
            console.log('value', value);

            setInitValue('');
            onChange('');
        }
    }, [value, isInit]);

    return (
        <>
            <div className="   w-full  min-h-[100px]">
                <p className=" font-semibold pr-3 pb-2">{label}</p>
                <Editor
                    key={name}
                    id="output_editor"
                    apiKey="g6v7lxx8s2baelpg69g81ei3jp7npb8bf1yv6hs8w8tp4422"
                    initialValue={initValue || ''}
                    init={{
                        height: 500,
                        menubar: false,
                        entity_encoding: 'raw',
                        verify_html: false,
                        image_title: true,
                        automatic_uploads: true,
                        plugins: [
                            'autolink',
                            'link',
                            'wordcount',
                            'preview',
                            'image',
                            'media'
                            // 'imagetools'
                        ],
                        toolbar:
                            'undo redo | blocks | ' +
                            'bold italic underline forecolor | link image media alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat',
                        file_picker_types: 'image',
                        file_picker_callback: function (cb: any, value: any, meta: any) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');

                            input.onchange = function () {
                                const inputElement = this as HTMLInputElement;
                                var file = inputElement.files?.[0];
                                if (!file) return;

                                var reader = new FileReader();
                                reader.onload = function () {
                                    var id = 'blobid' + new Date().getTime();
                                    // 为了解决类型"Window & typeof globalThis"上不存在属性"tinymce"的问题，使用类型断言
                                    var blobCache = (window as any).tinymce.activeEditor
                                        .editorUpload.blobCache;
                                    // 检查 reader.result 是否为 null，若为 null 则使用空字符串代替
                                    var base64 = reader.result ? reader.result.toString() : '';
                                    var blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);

                                    // 保存 blobUri 和 base64 的映射
                                    setBlobToBase64Map((prev) => ({
                                        ...prev,
                                        [blobInfo.blobUri()]: base64
                                    }));

                                    cb(blobInfo.blobUri(), { title: file?.name });
                                    // cb(base64, { title: file?.name });
                                };
                                reader.onerror = function () {
                                    console.error('File reading failed');
                                };
                                reader.readAsDataURL(file);
                            };
                            input.click();
                        },
                        content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content: any, editor: any) => {
                        // 替换所有 blobUri 为 base64
                        let newContent = content;
                        Object.entries(blobToBase64Map).forEach(([blobUri, base64]) => {
                            newContent = newContent.replaceAll(blobUri, base64);
                        });
                        // 用正则去掉多余的 data:image/jpeg;base64, 前缀，只保留一个
                        newContent = newContent.replace(
                            /(data:image\/jpeg;base64,)+/g,
                            'data:image/jpeg;base64,'
                        );
                        onChange(newContent || '');
                        // setValue(newContent);
                    }}
                />
            </div>
        </>
    );
}
