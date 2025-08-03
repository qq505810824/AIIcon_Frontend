'use client';

import { cn } from '@/lib/utils';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/theme-utils';
import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';
import FormEditor from './FormEditor';
import FormFilesWidget from './FormFilesWidget';
import FormFileWidget from './FormFileWidget';
import FormImage from './FormImage';
import FormMediasWidget from './FormMediasWidget';
import FormTagWidget from './FormTagWidget';

const theme = extendTheme({});

interface ViewProps {
    formData: any;
    className?: any;
    disabled?: boolean;
    onSubmit: any;
    storageName?: string;
}

export default function FormDetailView(props: ViewProps) {
    const { className, formData, disabled, onSubmit, storageName } = props;
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);

    function flattenObjectFields(obj: any) {
        let result: any = {};
        for (const key in obj) {
            if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                // 递归处理嵌套对象
                const flat = flattenObjectFields(obj[key]);
                result = { ...result, ...flat };
            } else {
                result[key] = obj[key];
            }
        }
        return result;
    }

    const submit = async ({ formData: submitData }: any) => {
        // const flatData = flattenObjectFields(submitData);
        const flatData = submitData;
        if (uploadFiles) {
            flatData.uploadFiles = uploadFiles;
            // console.log('uploadFileUrls', uploadFileUrls);
        }
        console.log('flatData', flatData);

        onSubmit(flatData);
    };

    const CustomSubmitButton = (props: any) => (
        <div className="flex justify-end">
            <Button
                colorScheme="blue"
                type="submit"
                disabled={props.disabled}
                isLoading={props.disabled}
                className="my-custom-submit"
            >
                {props.children || 'Submit'}
            </Button>
        </div>
    );

    const templates = {
        ButtonTemplates: {
            SubmitButton: CustomSubmitButton
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <div className={cn(' bg-white text-black p-2 rounded-md', className)}>
                {formData && (
                    <Form
                        schema={formData.json_schema}
                        uiSchema={formData.ui_schema}
                        formData={formData.form_data}
                        // formContext={{ json_schema: formData.json_schema, ui_schema: formData.ui_schema, form_data: formData.form_data, setFilesDatas }}
                        validator={validator}
                        onSubmit={submit}
                        disabled={disabled}
                        templates={templates}
                        // fields={fields}
                        // fields={{ DateRangeField: DateRangeFieldWrapper }}
                        widgets={{
                            editor: FormEditor,
                            image: (props) => FormImage({ ...props, storage: storageName }),
                            file: FormFileWidget,
                            medias: FormMediasWidget,
                            tag: FormTagWidget,
                            files: (props) =>
                                FormFilesWidget({ ...props, uploadFiles, setUploadFiles })
                        }}
                    />
                )}
            </div>
        </ChakraProvider>
    );
}
