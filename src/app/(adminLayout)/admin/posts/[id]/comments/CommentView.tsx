
import CommentItem from '@/app/components/admin/comments/CommentItem';
import TableSheet from '@/app/components/base/table';
import SearchInputView from '@/app/components/common/Views/SearchInputView';
import { CommentModel } from '@/models/Comment';
import { Typography } from '@mui/joy';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface ViewProps {
    data: any;
    isLoading: any;
    products: CommentModel[];
    onClose: () => void;
    handleSearch: any;
    searching?: boolean;
    onDelete: (id: number) => void;
    onUpdataStatus: (id: number, status: string) => void;
}

function CommentView(props: ViewProps) {
    const { isLoading, products, onClose, handleSearch, searching, onDelete, onUpdataStatus } =
        props;
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <React.Fragment>
            <div className="w-full flex justify-between items-center my-4">
                <Typography level="h3">Comment 列表</Typography>
                {/* <Button
                    variant="solid"
                    color="primary"
                    onClick={() => router.push('/admin/prompts/create')}
                >
                    +新增
                </Button> */}
            </div>
            <div>
                <SearchInputView
                    className={'w-full rounded-full mb-4'}
                    handleSearch={handleSearch}
                    loading={searching}
                    placeholder="Search"
                    sx={{
                        borderRadius: 100
                    }}
                />
            </div>
            <div className="w-full overflow-x-scroll">
                {/* 给表格外层容器添加样式，使其内容超出时可横向滚动 */}
                <TableSheet>
                    <thead>
                        <tr>
                            <th className="text-center w-[200px]">内容</th>
                            <th className="text-center w-[100px]">创建者</th>
                            <th className="text-center whitespace-nowrap w-[100px]">更新时间</th>
                            <th className="text-center whitespace-nowrap w-[200px]">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((row: CommentModel) => (
                            <CommentItem
                                product={row}
                                key={row.id}
                                onDelete={() => onDelete(row?.id || 0)}
                                onUpdataStatus={onUpdataStatus}
                            />
                        ))}
                    </tbody>
                </TableSheet>
            </div>
            {/* 当没有提示信息且不在加载状态时显示提示 */}
            {products.length === 0 && !isLoading && (
                <Typography level="h4" sx={{ padding: 10 }}>
                    No Data.
                </Typography>
            )}
        </React.Fragment>
    );
}

export default CommentView;
