import Button from '@/app/components/base/button';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadToAzure } from './utils/AzureService';

import imageCompression from 'browser-image-compression';
import ProgressModal from './ProgressModal';

export type EssayUploaderProps = {
    setOrcText?: any;
    uploadFileUrls?: string[];
    setUploadFileUrls?: any;
    setUploadFiles?: (files: File[]) => void;
};

export const UploadFilesToAzure = async (files?: File[]) => {
    console.log(files);
    if (files && files?.length > 0) {
        let image_urls: string[] = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const image_url = await UploadToAzure(file);
            image_urls.push(image_url);
            // console.log(`saved to ${image_url}`);
        }
        console.log('image_urls: ', image_urls);
        return image_urls.join(',');
    }
    return '';
};

const RunBatch: FC<EssayUploaderProps> = ({
    setOrcText,
    uploadFileUrls,
    setUploadFileUrls,
    setUploadFiles
}) => {
    // processModal:
    const [isOpen, setIsOpen] = useState(false);
    const [progressTitle, setProgressTitle] = useState('AI is working on it');
    const [progressPercentage, setProgressPercentage] = useState(20);
    const [progressText, setProgressText] = useState('waking up');
    const fileInputRef = useRef<HTMLInputElement>(null);

    function closeModal() {
        // setIsOpen(false)
    }

    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileTitle, setFileTitle] = useState('');
    const [previewFiles, setPreviewFiles] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const MAX_SIZE_MB = 4; // 4MB

    useEffect(() => {
        if (uploadFileUrls) {
            setPreviewFiles(uploadFileUrls);
        }
    }, [uploadFileUrls]);

    useEffect(() => {
        if (selectedFiles) {
            setUploadFiles && setUploadFiles(selectedFiles);
        }
    }, [selectedFiles]);

    const optimizeImage = async (
        file: any,
        maxWidth = 2000,
        maxHeight = 2000,
        maxSizeInMB = MAX_SIZE_MB
    ) => {
        const options = {
            maxSizeMB: maxSizeInMB,
            maxWidthOrHeight: Math.max(maxWidth, maxHeight),
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Image compression error:', error);
            throw error;
        }
    };

    const handleDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const heic2any = require('heic2any');
            setIsDragging(false);
            const totalFiles = acceptedFiles.length;
            let uploadedFiles = 0;

            for (let i = 0; i < totalFiles; i++) {
                let file = acceptedFiles[i];
                const fileProgress = (i + 1) / totalFiles;
                uploadedFiles++;
                setUploadProgress((uploadedFiles / totalFiles) * 100);

                if (file.type.startsWith('image/') || file.type.endsWith('pdf')) {
                    let fileURL;
                    let optimizedFile = file; // 默认使用原始文件

                    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                        if (
                            file.type.endsWith('heic') ||
                            file.name.toLowerCase().endsWith('.heic')
                        ) {
                            fileURL = URL.createObjectURL(
                                (await heic2any({ blob: file, toType: 'image/jpg' })) as Blob
                            );
                            const response = await fetch(fileURL);
                            const blob = await response.blob();
                            const compressedBlob = await optimizeImage(blob);
                            optimizedFile = new File(
                                [compressedBlob],
                                file.name.replace(/\.heic$/i, '.jpg'),
                                { type: 'image/jpeg' }
                            );
                        } else if (
                            file.type.endsWith('pdf') ||
                            file.name.toLowerCase().endsWith('.pdf')
                        ) {
                            const convertPdfToImages = (await import('./utils/Functions'))
                                .convertPdfToImages;
                            let fileURLs = await convertPdfToImages(file);
                            let files: File[] = [];
                            for (let j = 0; j < fileURLs.length; j++) {
                                let fetchedFile = await fetch(fileURLs[j]).then((r) => r.blob());
                                if (fetchedFile.size > MAX_SIZE_MB * 1024 * 1024) {
                                    const compressedBlob = await optimizeImage(fetchedFile);
                                    files.push(
                                        new File([compressedBlob], `${j + 1}_${file.name}.png`, {
                                            type: 'image/png'
                                        })
                                    );
                                } else {
                                    files.push(
                                        new File([fetchedFile], `${j + 1}_${file.name}.png`, {
                                            type: 'image/png'
                                        })
                                    );
                                }
                            }
                            setSelectedFiles((prev) => [...prev, ...files]);
                            setPreviewFiles((prev) => [...prev, ...fileURLs]);
                            continue;
                        } else {
                            const compressedBlob = await optimizeImage(file);
                            optimizedFile = new File([compressedBlob], file.name, {
                                type: file.type
                            });
                        }
                    }
                    // else if (
                    //     file.type.endsWith('pdf') ||
                    //     file.name.toLowerCase().endsWith('.pdf')
                    // ) {
                    //     const convertPdfToImages = (await import('./utils/Functions'))
                    //         .convertPdfToImages;
                    //     let fileURLs = await convertPdfToImages(file);
                    //     let files: File[] = [];
                    //     for (let i = 0; i < fileURLs.length; i++) {
                    //         let f = await fetch(fileURLs[i]).then((r) => r.blob());
                    //         files.push(new File([f], `${i + 1}_${file.name}.png`));
                    //     }
                    //     setSelectedFiles((prev) => [...prev, ...files]);
                    //     setPreviewFiles((prev) => [...prev, ...fileURLs]);
                    //     continue;
                    // }

                    fileURL = URL.createObjectURL(optimizedFile);

                    setSelectedFiles((prev) => [...prev, optimizedFile]);
                    setPreviewFiles((prev) => [...prev, fileURL]);
                }
            }
            setUploadProgress(0);
            // 手动重置输入框，确保可以再次上传
            // if (fileInputRef.current) {
            //     fileInputRef.current.value = '';
            // }
        },
        [fileTitle]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: {
            'image/*': [],
            'application/pdf': []
        }
    });

    const onGrade = async (title: string, files?: File[]) => {
        console.log(`Title: ${title}`);
        console.log(files);
        if (files && files?.length > 0) {
            let ocrText = '';
            let image_urls: string[] = [];
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                // console.log(file);
                // console.log(`File: ${file}`);
                // console.log('calling azure ocr service');
                // console.log('end calling');
                setIsOpen(true);
                setProgressTitle('Submiting');
                setProgressText('Handing over the essay to the AI Assistant...');
                setProgressPercentage((index / files.length) * (100 / 3));
                const image_url = await UploadToAzure(file);
                image_urls.push(image_url);
                // console.log(`saved to ${image_url}`);
            }
            console.log('image_urls: ', image_urls);

            // for (let index = 0; index < image_urls.length; index++) {
            //     const url = image_urls[index];
            //     setProgressTitle('Reading');
            //     setProgressText('AI Assistant reviewing the essay...');
            //     setProgressPercentage((index / image_urls.length + 1) * (100 / 3));
            //     ocrText += '\n';
            //     ocrText += await CallAzureOcrService(url);
            // }
            // setOrcText(ocrText);
            // console.log(`ocrText: ${ocrText}`);
        }
        setIsOpen(false);
    };

    return (
        <>
            <ProgressModal
                {...{
                    isOpen,
                    closeModal,
                    progressText,
                    progressTitle,
                    progressPercentage
                }}
            />
            {/* <p className="mt-4 text-gray-900 text-sm font-medium">Upload images/PDF file(s):</p> */}
            <div
                {...getRootProps()}
                className={`flex w-full mt-2 flex-wrap border-2 border-dashed rounded-lg p-4 ${
                    isDragging ? 'border-red-600 bg-red-50' : ''
                }`}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
            >
                {uploadProgress > 0 && (
                    <div className="relative w-full pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Uploading
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600">
                                    {Math.round(uploadProgress)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                                style={{ width: `${uploadProgress}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                        </div>
                    </div>
                )}
                {previewFiles.length > 0
                    ? previewFiles.map((src, index) => {
                          const isPdf =
                              src.toLowerCase().endsWith('.pdf') ||
                              src.toLowerCase().includes('.pdf') ||
                              (src.startsWith('blob:') &&
                                  selectedFiles[index]?.type === 'application/pdf');
                          return (
                              <div key={index} className="relative">
                                  <div
                                      className="absolute -top-2 -left-2 bg-white rounded-full p-1 shadow cursor-pointer hover:bg-gray-100"
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedFiles((prev) => [
                                              ...prev.slice(0, index),
                                              ...prev.slice(index + 1)
                                          ]);
                                          setPreviewFiles((prev) => [
                                              ...prev.slice(0, index),
                                              ...prev.slice(index + 1)
                                          ]);
                                          setUploadFileUrls &&
                                              setUploadFileUrls((prev: any) => [
                                                  ...prev.slice(0, index),
                                                  ...prev.slice(index + 1)
                                              ]);
                                      }}
                                  >
                                      <XCircleIcon className="h-6 text-red-500" />
                                  </div>
                                  <div className="cursor-pointer">
                                      {isPdf ? (
                                          <embed
                                              src={src}
                                              type="application/pdf"
                                              className="mb-4 mx-auto h-48 rounded-lg border"
                                              width="100%"
                                              height="192px"
                                          />
                                      ) : (
                                          <img
                                              src={src}
                                              className="mb-4 mx-auto h-48 rounded-lg border"
                                              alt="Preview"
                                          />
                                      )}
                                  </div>
                              </div>
                          );
                      })
                    : uploadProgress === 0 && (
                          <>
                              {/* <input {...getInputProps()} /> */}
                              {isDragging ? (
                                  <p className="text-lg font-medium text-red-600 ">
                                      Release to drop images here
                                  </p>
                              ) : (
                                  <p className="text-lg font-medium text-gray-500 ">
                                      Drag and drop images/pdf here or click to select
                                  </p>
                              )}
                          </>
                      )}
                <input {...getInputProps()} />
            </div>
            <div className="w-full mt-4 hidden">
                <div className="flex items-center justify-between">
                    <Button
                        className="!h-8 !p-3"
                        disabled={false}
                        onClick={() => {
                            setSelectedFiles([]);
                            setPreviewFiles([]);
                        }}
                    >
                        <span className="text-[13px]">{'Clear'}</span>
                    </Button>
                    <Button
                        type="primary"
                        className="!h-8 !pl-3 !pr-4"
                        disabled={false}
                        onClick={() => onGrade(fileTitle, selectedFiles)}
                    >
                        <PlayIcon className="shrink-0 w-4 h-4 mr-1" aria-hidden="true" />
                        <span className="text-[13px]">{'Convert To Text'}</span>
                    </Button>
                </div>
            </div>
        </>
    );
};
export default React.memo(RunBatch);
