'use client';
import { useAppContext } from '@/context/app-context';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalStyles, Link, Sheet } from '@mui/joy';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import MenuButton from './MenuButton';
import './style.css';

interface ViewProps {
    title: string;
    section: string;
    setSection: any;
    links: any[];
}

export default function GoldHeaderView(props: ViewProps) {
    const { title, section, setSection, links } = props;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 移動端選單狀態
    const pathname = usePathname(); // 獲取當前路徑

    const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const { userProfile } = useAppContext();

    const supabase = createClientComponentClient();
    const router = useRouter();

    const showSection = (section: string) => {
        setSection(section);
        router.push(section);
    };

    const logout = async () => {
        localStorage.setItem('email', '');
        localStorage?.setItem('user_id', '');
        localStorage.setItem('supabase_user', '');
        localStorage.setItem('account', '');
        const res = await supabase.auth.signOut();
        router.push(`/signin?redirect=${window.location.href}`);
    };

    return (
        <>
            <Sheet
                sx={{
                    display: { xs: 'flex', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: { xs: 'space-between', md: 'flex-end' },
                    // position: 'fixed',
                    // top: 0,
                    // width: '100vw',
                    height: 'var(--Header-height)',
                    zIndex: 9995,
                    p: 4,
                    gap: 1,
                    borderBottom: '1px solid',
                    borderColor: 'background.level1',
                    boxShadow: 'sm'
                }}
            >
                <GlobalStyles
                    styles={(theme) => ({
                        ':root': {
                            '--Header-height': '52px',
                            [theme.breakpoints.up('md')]: {
                                '--Header-height': 'auto'
                            }
                        }
                    })}
                />

                <header
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-800 border-b border-gold-400/20 px-4 md:px-4 py-4`}
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden flex items-center p-2 rounded-md text-gold-400 hover:text-gold-500 transition-colors focus:outline-none"
                                aria-expanded={isMenuOpen}
                                aria-label="打開選單"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                            <div className="text-2xl font-luxury font-bold text-gold-400">
                                {title}
                            </div>
                            <nav className="hidden md:flex space-x-6 ml-8">
                                {links.map((link) => {
                                    return (
                                        <button
                                            key={link.href}
                                            onClick={() => {
                                                showSection(link.href);
                                            }}
                                            className="nav-link text-white hover:text-gold-400 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative hidden">
                                <FontAwesomeIcon icon={faBell} className="text-gold-400 text-2xl" />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <div className="hidden w-10 h-10 bg-gradient-to-br ml-4 from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
                                <span className="text-gray-900 font-semibold">JD</span>
                            </div>{' '}
                            {userProfile?.id != '' ? (
                                <div className="flex justify-end items-center col-span-3 md:col-span-4">
                                    <MenuButton
                                        avatar={userProfile?.avatar}
                                        email={userProfile?.email}
                                        logout={logout}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-row gap-8 items-center justify-end col-span-3">
                                    <Link
                                        href={`/login?redirect=${window.location.href}`}
                                        className="text-purple-900 hover:underline"
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 移動端下拉選單 */}
                    <div
                        className={`flex md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="w-full flex flex-col px-4 pt-4 pb-3 space-y-1 shadow-inner">
                            {links.map((link) => {
                                // const isActive = section == link.href;
                                let isActive =
                                    pathname === link.href ||
                                    (pathname.startsWith(link.href) && link.href !== '/');

                                // console.log('pathname', pathname);

                                if (
                                    (pathname == '/dashbord' || pathname == '/') &&
                                    link.href == '/'
                                ) {
                                    isActive = true;
                                }

                                return (
                                    <div
                                        key={link.href}
                                        // href={link.href}
                                        className={`w-full block px-3 py-2 rounded-md text-base font-medium transition-colors 
                              ${isActive ? 'text-white bg-gold-500' : 'text-gold-400'} `}
                                        onClick={() => {
                                            showSection(link.href);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {link.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </header>
            </Sheet>
        </>
    );
}
