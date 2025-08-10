import CourseCard from '@/app/components/community/courses/CourseCard';
import { CourseModel } from '@/models/Course';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDetailContext } from '../communitys/[id]/detail-context';

interface ViewProps {
    courses: CourseModel[];
    handleRefresh?: any;
}

export default function CourseView({ courses, handleRefresh }: ViewProps) {
    const router = useRouter();
    const params = useParams();
    const { activeTab, setActiveTab, permissions } = useAppDetailContext();
    const handleCreatCourse = () => {
        router.push(`/courses/create?community_id=${params['id']}`);
    };

    const showCreateCourse = () => {
        return permissions.addCourse;
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center  flex-wrap space-y-2">
                    <div>
                        <h3 className="text-xl font-semibold">Courses</h3>
                        <p className="text-gray-400 text-sm">
                            Admin-only Courses for announcements and updates
                        </p>
                    </div>
                    {showCreateCourse() && (
                        <button
                            onClick={() => {
                                handleCreatCourse();
                            }}
                            className="bg-gold-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gold-600 flex items-center space-x-2 whitespace-nowrap"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Course</span>
                        </button>
                    )}
                </div>

                {/* Course List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses?.map((course, index) => <CourseCard course={course} key={index} handleRefresh={handleRefresh} />)}
                </div>
                {courses?.length == 0 && (
                    <div className="w-full flex flex-col items-center justify-center py-16 text-gray-400">
                        <div className="text-lg font-semibold mb-1">No course yet</div>
                        <div className="text-sm">
                            Be the first to create a course in this community!
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
