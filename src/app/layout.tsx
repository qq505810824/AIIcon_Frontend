import Topbar from '@/app/components/base/topbar';
import BrowerInitor from '@/app/components/browser-initor';
import I18NServer from '@/app/components/i18n-server';
import SentryInitor from '@/app/components/sentry-initor';
import { getLocaleOnServer } from '@/i18n/server';
import type { Viewport } from 'next';
import './styles/globals.css';

export const metadata = {
    title: 'AIIcon Ultra'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
    userScalable: false
};

const LocaleLayout = ({ children }: { children: React.ReactNode }) => {
    const locale = getLocaleOnServer();

    return (
        <html lang={locale ?? 'en'} className="h-full">
            <head>
                <meta name="theme-color" content="#FFFFFF" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className="h-full select-auto">
                <Topbar />
                <BrowerInitor>
                    <SentryInitor>
                        {/* @ts-expect-error Async Server Component */}
                        <I18NServer locale={locale}>{children}</I18NServer>
                    </SentryInitor>
                </BrowerInitor>
            </body>
        </html>
    );
};

export default LocaleLayout;
