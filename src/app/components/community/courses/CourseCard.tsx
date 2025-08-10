import { useAppDetailContext } from '@/app/(communityLayout)/communitys/[id]/detail-context';
import { useModalContext } from '@/context/modal-context';
import { useCourseOperations } from '@/hooks/useCourseData';
import { CourseModel } from '@/models/Course';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Toast from '../../base/toast';
import OperationsView from '../../common/Views/OperationsView';

interface ViewProps {
    course: CourseModel;
    handleRefresh?: any;
}

export default function CourseCard({ course, handleRefresh }: ViewProps) {
    const router = useRouter();
    const { setShowConfirmDelete } = useModalContext();
    const { activeTab, setActiveTab, permissions } = useAppDetailContext();
    const { deleteCourse } = useCourseOperations()

    const handleEdit = () => {
        router.push(`/courses/${course.id}/edit`)

    }

    const handleDelete = () => {
        setShowConfirmDelete({
            payload: {},
            onSaveCallback: async () => {
                const res = await deleteCourse(course?.id || 0);
                Toast.notify({
                    type: 'success',
                    message: 'Successful!'
                });
                handleRefresh && handleRefresh()
            }
        });
    }

    const showEditCourse = () => {
        return permissions && permissions.addCourse
    }

    return (
        <>
            <div
                key={course.id}
                onClick={() => {
                    // handleClickCourse(course)
                    // setSelectedCourse(course);
                    setActiveTab({ name: 'course-detail', meta: { course } });
                }}
                className="bg-gray-800 relative card-hover border border-gold-400/20 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {/* bg-gradient-to-br from-blue-100 to-purple-100  */}
                    {/* <div className="text-4xl">{course.cover_url}</div> */}
                    {course.cover_url && (
                        <img
                            src={course.cover_url}
                            alt="Course Media"
                            className=" object-cover w-full h-full rounded-lg"
                        />
                    )}
                </div>
                {showEditCourse() &&
                    <div className=' absolute right-1 top-1'>
                        <OperationsView {...{
                            btnClassName: 'bg-white',
                            handleDelete,
                            handleEdit
                        }} />
                    </div>
                }

                <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{course.title}</h4>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-400">{course.rating || 1}</span>
                        </div>
                    </div>

                    <p
                        className="text-gray-400 text-sm mb-4 line-clamp-2"
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            WebkitLineClamp: 1,
                            height: '1.5em' // 根据行高设置最大高度
                        }}
                    >
                        {course.description.replace(/<[^>]*>/g, '')}
                    </p>

                    {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p> */}

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>{course.lessons || 0} lessons</span>
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>{course.enrolled_count || 0} enrolled</span>
                            <span>by {course?.owner?.name}</span>
                        </div>
                    </div>

                    {/* {course.progress > 0 && (
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full"
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )} */}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-bold text-green-600">
                                {course.price === 0 ? 'Free' : `$${course.price}`}
                            </span>
                            {/* {course.tier !== 'all' && (
                                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                            {course.tier}
                                        </span>
                                    )} */}
                        </div>
                        <button className="bg-gold-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gold-600">
                            {/* {course.progress > 0 ? 'Continue' : 'Start'} */}
                            Start
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
