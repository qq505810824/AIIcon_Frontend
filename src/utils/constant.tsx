import {
    Audiotrack as AudiotrackIcon,
    Brush as BrushIcon,
    Chat as ChatIcon,
    Code as CodeIcon,
    DesignServices as DesignServicesIcon,
    Edit as EditIcon,
    ListAlt as ListAltIcon,
    School as SchoolIcon,
    Search as SearchIcon,
    VideoCameraFront as VideoCameraFrontIcon
} from '@mui/icons-material'; // 从 Material-UI 导入图标
import AirplayOutlinedIcon from '@mui/icons-material/AirplayOutlined';
import DvrIcon from '@mui/icons-material/Dvr';
import GroupsIcon from '@mui/icons-material/Groups';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export const AppMeuns = [
    {
        name: 'AI 搜索引擎',
        href: '?type=AI 搜索引擎',
        icon: <SearchIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 聊天问答',
        href: '?type=AI 聊天问答',
        icon: <ChatIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Agent智能体',
        href: '?type=Agent智能体',
        icon: <GroupsIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 文本写作',
        href: '?type=AI 文本写作',
        icon: <EditIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 绘画作图',
        href: '?type=AI 绘画作图',
        icon: <BrushIcon sx={{ color: '#eeeeee' }} className="w-" />,
        items: []
    },
    {
        name: 'AI 设计工具',
        href: '?type=AI 设计工具',
        icon: <DesignServicesIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 视频创作',
        href: '?type=AI 视频创作',
        icon: <VideoCameraFrontIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 音频制作',
        href: '?type=AI 音频制作',
        icon: <AudiotrackIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 办公学习',
        href: '?type=AI 办公学习',
        icon: <SchoolIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 编程开发',
        href: '?type=AI 编程开发',
        icon: <CodeIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'AI 网址导航',
        href: '?type=AI 网址导航',
        icon: <SendOutlinedIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Prompt指令',
        href: '?type=Prompt指令',
        icon: <ListAltIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'DocAI网站',
        href: '?type=DocAI网站',
        icon: <LanguageIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'YouTuBe网站',
        href: '?type=YouTuBe网站',
        icon: <LanguageIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: '其他网站',
        href: '?type=其他网站',
        icon: <AirplayOutlinedIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    }
];

export const PromptFatherTags = [
    {
        name: 'Develop'
    },
    {
        name: 'Office'
    },
    {
        name: 'Article'
    },
    {
        name: 'Draw'
    },
    {
        name: 'Marketing'
    },
    {
        name: 'AI'
    },
    {
        name: 'Eduction'
    },
    {
        name: 'Other'
    }
];

export const PromptTags = [
    {
        father: 'Develop',
        name: '学术',
        color: '#6FD025'
    },
    {
        father: 'Develop',
        name: '代码',
        color: '#96C1CF'
    },
    {
        father: 'Develop',
        name: '编码',
        color: '#FF5733'
    },
    {
        father: 'Develop',
        name: '数据',
        color: '#33FF57'
    },
    {
        father: 'Develop',
        name: '发展',
        color: '#3357FF'
    },
    {
        father: 'Develop',
        name: 'DevOps',
        color: '#F1C40F'
    },

    {
        father: 'Office',
        name: '商业',
        color: '#E74C3C'
    },
    {
        father: 'Office',
        name: '商业创意',
        color: '#8E44AD'
    },
    {
        father: 'Office',
        name: '商业计划',
        color: '#3498DB'
    },
    {
        father: 'Office',
        name: '职业',
        color: '#2ECC71'
    },
    {
        father: 'Office',
        name: '创业',
        color: '#1ABC9C'
    },
    {
        father: 'Office',
        name: '金融',
        color: '#F39C12'
    },
    {
        father: 'Office',
        name: '投资',
        color: '#D35400'
    },

    {
        father: 'Article',
        name: '文章',
        color: '#C0392B'
    },
    {
        father: 'Article',
        name: '博客',
        color: '#2980B9'
    },
    {
        father: 'Article',
        name: '博客文章',
        color: '#8E44AD'
    },
    {
        father: 'Article',
        name: '书籍',
        color: '#27AE60'
    },
    {
        father: 'Article',
        name: '文档',
        color: '#F1C40F'
    },
    {
        father: 'Article',
        name: '新闻',
        color: '#E67E22'
    },
    {
        father: 'Article',
        name: '写作',
        color: '#2C3E50'
    },

    {
        father: 'Draw',
        name: '动画',
        color: '#D35400'
    },
    {
        father: 'Draw',
        name: '艺术',
        color: '#C0392B'
    },
    {
        father: 'Draw',
        name: '设计',
        color: '#2980B9'
    },
    {
        father: 'Draw',
        name: '图片',
        color: '#27AE60'
    },
    {
        father: 'Draw',
        name: '摄影',
        color: '#8E44AD'
    },

    {
        father: 'Marketing',
        name: '广告',
        color: '#F39C12'
    },
    {
        father: 'Marketing',
        name: '品牌营销',
        color: '#E67E22'
    },
    {
        father: 'Marketing',
        name: '电子邮件',
        color: '#2C3E50'
    },
    {
        father: 'Marketing',
        name: 'Instagram',
        color: '#9B59B6'
    },
    {
        father: 'Marketing',
        name: 'SEO',
        color: '#34495E'
    },

    {
        father: 'AI',
        name: '人工智能',
        color: '#16A085'
    },
    {
        father: 'AI',
        name: '聊天人工智能',
        color: '#F39C12'
    },
    {
        father: 'AI',
        name: '图像生成器',
        color: '#E74C3C'
    },
    {
        father: 'AI',
        name: '文本生成器',
        color: '#8E44AD'
    },

    {
        father: 'Eduction',
        name: '分析',
        color: '#3498DB'
    },
    {
        father: 'Eduction',
        name: '大学',
        color: '#2ECC71'
    },
    {
        father: 'Eduction',
        name: '沟通',
        color: '#1ABC9C'
    },
    {
        father: 'Eduction',
        name: '语言',
        color: '#F1C40F'
    },
    {
        father: 'Eduction',
        name: '学习',
        color: '#E67E22'
    },

    {
        father: 'Other',
        name: '头脑风暴',
        color: '#C0392B'
    },
    {
        father: 'Other',
        name: '角色',
        color: '#2980B9'
    },
    {
        father: 'Other',
        name: '喜剧',
        color: '#27AE60'
    },
    {
        father: 'Other',
        name: '文化',
        color: '#8E44AD'
    },
    {
        father: 'Other',
        name: '约会',
        color: '#F39C12'
    },
    {
        father: 'Other',
        name: '食物',
        color: '#D35400'
    },
    {
        father: 'Other',
        name: '幽默',
        color: '#C0392B'
    }
];

export const AdminMeuns = [
    {
        name: 'Community列表',
        href: '/admin/communitys',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Channel列表',
        href: '/admin/channels',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Post列表',
        href: '/admin/posts',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Course列表',
        href: '/admin/courses',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Calendar列表',
        href: '/admin/calendars',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Campaign列表',
        href: '/admin/campaigns',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    {
        name: 'Media列表',
        href: '/admin/medias',
        icon: <DvrIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    },
    // {
    //     name: '表單列表',
    //     href: '/admin/forms',
    //     icon: <PeopleIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
    //     items: []
    // },
    // {
    //     name: 'Books列表',
    //     href: '/admin/books',
    //     icon: <MenuBookIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
    //     items: []
    // },
    {
        name: '用户列表',
        href: '/admin/accounts',
        icon: <PeopleIcon sx={{ color: '#eeeeee' }} className="w-5 text-[#eeeeee]" />,
        items: []
    }
];

export const FormulabotMeuns = [
    {
        name: 'Templates',
        href: '/formulabot/dashboard?menu=templates',
        value: 'templates',
        icon: <DvrIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Formula Generator',
        href: '/formulabot/dashboard?menu=tools&tool=excel&category=generator',
        value: 'generator',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'PDF to Execl Converter',
        href: '/formulabot/dashboard?menu=tools&tool=pdf-to-excel-converter&category=overview',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    }
];

export const ToolsMeuns = [
    {
        name: 'Excel Guru',
        href: '/formulabot/dashboard?menu=tools&tool=excel&category=overview',
        value: 'excel',
        icon: <DvrIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Google Sheets',
        href: '/formulabot/dashboard?menu=tools&tool=google-sheets&category=overview',
        value: 'google-sheets',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'PDF to Excel Converter',
        href: '/formulabot/dashboard?menu=tools&tool=pdf-to-excel-converter&category=overview',
        value: 'pdf-to-excel-converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'AI Prompt',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Google Analytics',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Sentiment Analysis',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Text Extraction',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Google Search Console',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Text Classification',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Google Trends',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    },
    {
        name: 'Economic Data',
        href: '/formulabot/dashboard?menu=converter',
        value: 'converter',
        icon: <PeopleIcon sx={{ color: '#000' }} className="w-5 text-[#000]" />,
        items: []
    }
];

export const HotsFatherTags = [
    {
        name: '美食'
    },
    {
        name: '旅游'
    }
];

export const CalendarCategorys = [
    {
        name: 'All',
        value: ''
    },
    {
        name: 'Course',
        value: 'course'
    },
    {
        name: 'Activity',
        value: 'activity'
    }
];

export const CalendarFilters = [
    {
        name: '按最近更新排序',
        value: 'created_at'
    },
    {
        name: '按活動時間排序',
        value: 'from_date'
    }
    // {
    //     name: '按瀏覽數',
    //     value: 'view_count'
    // }
];

export const RegionFilters = [
    {
        name: '香港',
        value: 'hk'
    },
    {
        name: '澳門',
        value: 'mo'
    }
];
