import Button from '@/app/components/base/button';
import { useAppContext } from '@/context/app-context';
import { useContactOperations } from '@/hooks/useAccountContactData';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next'; // 引入 useTranslation
import * as XLSX from 'xlsx';

interface ViewProps {
    handleRefresh: any;
}

export default function ImportFromExeclButton({ handleRefresh }: ViewProps) {
    const { t } = useTranslation(); // 使用 useTranslation
    const { importData } = useContactOperations();
    const { user_id } = useAppContext();
    const fileRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const params = useParams();
    const [columns, setColumns] = useState<any[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框的状态
    const [file, setFile] = useState<File>();


    useEffect(() => {
        if (columns && columns.length > 0) {

            importToContact(columns)

        }
    }, [columns]);

    const importToContact = async (datas: any[]) => {
        const newDatas = datas.map((data) => {
            return {
                owner: user_id,
                source: "execl",
                meta: data
            }

        })
        console.log('newDatas', newDatas);

        const res = await importData(newDatas);
        console.log('res', res);
        handleRefresh && handleRefresh()

    }

    const handleExeclFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0]; // 获取第一个工作表的名称
            const worksheet = workbook.Sheets[firstSheetName]; // 获取第一个工作表
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // 将工作表转换为 JSON
            const rowCount = jsonData.length; // 获取行数
            // console.log(`行数: ${rowCount}`); // 输出行数
            // console.log('jsonData', jsonData);

            // 获取头部标题
            const headers: any = jsonData[0];
            // 获取数据行
            const rows: any = jsonData.slice(1);

            // 转换为对象数组
            const objects = rows.map((row: any[]) => {
                const obj: Record<string, any> = {};
                headers?.forEach((key: string, idx: number) => {
                    obj[key] = row[idx];
                });
                return obj;
            });
            setColumns(objects)
            console.log('对象数组:', objects); // 输出所有数据

            // 提取头部标题
            // const headers = jsonData[0]; // 获取第一行作为标题
            // console.log('头部标题:', headers); // 输出头部标题
            // if (Array.isArray(headers)) {
            //     setHeadTitles(headers);
            //     setShowColumns(headers);
            //     // handleColumns(headers);
            // }
            // handleOpenModal();


        };
        reader.readAsArrayBuffer(file); // 读取文件为 ArrayBuffer
    };

    const handleCsvFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const headers: any = jsonData[0];
            const rows: any = jsonData.slice(1);

            const objects = rows.map((row: any[]) => {
                const obj: Record<string, any> = {};
                headers?.forEach((key: string, idx: number) => {
                    obj[key] = row[idx];
                });
                return obj;
            });
            setColumns(objects);
            console.log('CSV objects:', objects);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log('file', file);

        if (file) {
            setFile(file);
            const fileType = file.type.toLowerCase();
            // setName(file.name.replace(/\.[^/.]+$/, ''));
            const fileUrl = URL.createObjectURL(file);
            console.log(fileUrl); // 输出文件的 URL

            if (fileRef.current) {
                fileRef.current.value = '';
            }

            if (fileType.includes('csv')) {
                handleCsvFile(file);
            } else {
                handleExeclFile(file)
            }
        }
    };

    return (
        <>
            <Button
                type="primary"
                className="ml-2 px-2 cursor-pointer bg-gold-400 hover:bg-gold-500 "
                loading={submitting}
                onClick={() => {
                    document.getElementById('fileInput')?.click(); // 触发文件输入
                }}
            >
                <PlusIcon className="w-3 sm:w-4 mr-1 cursor-pointer "></PlusIcon>
                <label className="text-xs sm:text-sm cursor-pointer ">
                    {'Import Contacts'}
                </label>
            </Button>
            <input
                ref={fileRef}
                type="file"
                id="fileInput"
                accept=".xlsx,.csv"
                style={{ display: 'none' }}
                onChange={handleFileChange} // 处理文件选择
            />
        </>
    );
}
