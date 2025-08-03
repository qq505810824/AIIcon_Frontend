import { useRouter } from 'next/navigation';
import type { FC } from 'react';

type LogoSiteProps = {
    className?: string;
};

const LogoSite: FC<LogoSiteProps> = ({ className }) => {
    const router = useRouter();
    return (
        <>
            <p
                className="text-xl font-semibold cursor-pointer"
                onClick={() => {
                    router.push('/');
                }}
            >
                AIIcon Ultra
            </p>
        </>
        // <img
        //     src="/logo/logo-site.png"
        //     className={classNames('block w-auto h-10', className)}
        //     alt="logo"
        // />
    );
};

export default LogoSite;
