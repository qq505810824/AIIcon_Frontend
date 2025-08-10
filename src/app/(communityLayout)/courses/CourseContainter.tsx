'use client';

import Loading from '@/app/components/base/loading';
import { useCourseData } from '@/hooks/useCourseData';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import CourseView from './CourseView';

export default function CourseContainter() {
    const params = useParams();
    const { data, isLoading, isError, mutate } = useCourseData({ community_id: params['id'] });

    useEffect(() => {
        if (params) {
            // mutate()
        }
    }, [params]);

    const handleRefresh = () => {
        mutate();
    };

    if (isLoading) return <Loading type="app" />;
    return (
        <>
            <CourseView
                {...{
                    courses: data,
                    handleRefresh
                }}
            />
        </>
    );
}
