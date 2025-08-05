import { AppMeuns, PromptTags, RegionFilters } from './constant';

export const AppFormData = {
    fieldSchema: {
        category: { type: 'string', title: '分类', required: true },
        data_url: { type: 'string', title: '网址链接', required: true },
        title: { type: 'string', title: '名称', required: true },
        description: { type: 'string', title: '描述', required: true },
        img_src: { type: 'string', title: 'Logo图片链接', required: false }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        category: {
            'ui:widget': 'select',
            'ui:options': { enumOptions: AppMeuns.map((menu) => menu.name) }
        },
        description: { 'ui:widget': 'textarea' },
        data_url: { 'ui:widget': 'link' },
        img_src: { 'ui:widget': 'text' }
    }
};

export const ArticleFormData = {
    fieldSchema: {
        title: { type: 'string', title: '标题', required: true },
        description: { type: 'string', title: '描述', required: true }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        description: { 'ui:widget': 'textarea' }
    }
};

export const PromptFormData = {
    fieldSchema: {
        title: { type: 'string', title: '标题', required: true, tip: '' },
        type: { type: 'string', title: '类型', required: true, tip: '' },
        tags: { type: 'string', title: '标签', required: true, tip: '' },
        description: { type: 'string', title: '描述', required: true, tip: '' },
        prompt: {
            type: 'string',
            title: 'Prompt',
            required: true,
            tip: 'Use this field to create your actual prompt template. Press to create placeholder tags so users can customize the inputs for your template.'
        }
    },
    uiSchema: {
        title: { 'ui:widget': 'text' },
        type: { 'ui:widget': 'select', 'ui:options': { enumOptions: ['Text', 'Video'] } },
        tags: {
            'ui:widget': 'tag',
            'ui:options': { enumOptions: [...PromptTags] }
        },
        description: { 'ui:widget': 'textarea' },
        prompt: { 'ui:widget': 'textarea' }
    }
};

export const AccountFormData = {
    fieldSchema: {
        name: { type: 'string', title: '名称', required: true },
        email: { type: 'string', title: '邮箱', required: true },
        nickname: { type: 'string', title: '昵称', required: true },
        password: { type: 'string', title: '密码', required: true },
        avatar: { type: 'string', title: '头像', required: false }
    },
    uiSchema: {
        name: { 'ui:widget': 'text' },
        email: { 'ui:widget': 'text' },
        nickname: { 'ui:widget': 'text' },
        password: { 'ui:widget': 'password' },
        avatar: { 'ui:widget': 'text' }
    }
};

export const CalendarFormData = {
    fieldSchema: {
        image_url: { type: 'file', title: '', required: true, tip: '' },
        name: { type: 'string', title: '活動名稱', required: true, tip: '' },
        category: { type: 'string', title: '类型', required: true, tip: '' },
        pre_date_range: { type: 'string', title: '報名日期範圍', required: false, tip: '(選填)' },
        date_range: { type: 'string', title: '活動日期範圍', required: true, tip: '' },
        region: { type: 'string', title: '地區', required: true, tip: '' },
        form_url: { type: 'string', title: '報名表單連結', required: false, tip: '(選填)' },
        reference_url: { type: 'string', title: '相關網址', required: false, tip: '(選填)' },
        files_url: { type: 'string', title: '相關文件', required: false, tip: '(選填)' },
        description: { type: 'string', title: '描述', required: true, tip: '' }
    },
    uiSchema: {
        name: { 'ui:widget': 'text' },
        category: {
            'ui:widget': 'select',
            'ui:options': {
                enumOptions: [
                    {
                        name: '課程',
                        value: 'course'
                    },
                    {
                        name: '活動',
                        value: 'activity'
                    }
                ]
            }
        },
        region: {
            'ui:widget': 'select',
            'ui:options': {
                enumOptions: RegionFilters
            }
        },
        // tags: {
        //     'ui:widget': 'tag',
        //     'ui:options': { enumOptions: [...PromptTags] }
        // },
        description: { 'ui:widget': 'textarea' },
        image_url: { 'ui:widget': 'file' },
        date_range: {
            'ui:widget': 'date_range',
            'ui:keys': { start_date: 'from_date', end_date: 'to_date' }
        },
        pre_date_range: {
            'ui:widget': 'date_range',
            'ui:keys': { start_date: 'pre_from_date', end_date: 'pre_to_date' }
        },
        reference_url: { 'ui:widget': 'text' },
        files_url: { 'ui:widget': 'upload' },
        form_url: { 'ui:widget': 'text' }
    }
};

export const CourseFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Course',
        description: '',
        required: ['title'],
        properties: {
            cover_url: {
                type: 'string',
                title: '封面'
            },
            title: {
                type: 'string',
                title: 'Title'
            },
            category: {
                type: 'string',
                title: 'Category'
            },
            description: {
                type: 'string',
                title: 'Description'
            },
            video_url: {
                type: 'string',
                title: 'Video Link'
            },
            price: {
                type: 'integer',
                title: 'Price ($)'
            },
            duration: {
                type: 'string',
                title: 'Duration'
            },
            lessons: {
                type: 'integer',
                title: 'Lessons'
            },
            tier: {
                type: 'string',
                title: 'Access Level',
                oneOf: [
                    { title: 'All Members', const: 'all' },
                    { title: 'Basic Tier', const: 'basic' },
                    { title: 'Premium Tier', const: 'premium' }
                ]
            },
            // rating: {
            //     type: 'integer',
            //     title: 'Rating'
            // },
            // is_free: {
            //     type: 'string',
            //     title: '描述'
            // },

            files_url: {
                type: 'string',
                title: 'Files'
            },
            learns: {
                type: 'array',
                title: 'Learns',
                items: {
                    type: 'string',
                    default: ''
                }
            }
        }
    },
    ui_schema: {
        cover_url: {
            'ui:widget': 'image'
        },
        title: {
            'ui:widget': 'text'
        },
        category: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'editor'
        },
        files_url: {
            'ui:widget': 'files'
        },
        price: {
            'ui:widget': 'updown'
        },
        // is_free: {
        //     'ui:widget': 'date'
        // },
        video_url: {
            'ui:widget': 'text'
        },
        duration: {
            'ui:widget': 'text'
        },
        lessons: {
            'ui:widget': 'updown'
        },
        rating: {
            'ui:widget': 'updown'
        }
    },
    form_data: {
        title: '',
        category: '',
        cover_url: '',
        description: '',
        duration: '1h',
        price: 0,
        lessons: 0,
        rating: 1,
        files_url: '',
        video_url: ''
    }
};

export const CommunityFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Community',
        description: '',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                title: 'Name'
            },
            description: {
                type: 'string',
                title: 'Description'
            }
        }
    },
    ui_schema: {
        title: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'editor'
        }
    },
    form_data: {}
};

export const ChannelFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Text Channel',
        description: '',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                title: 'Name'
            },
            description: {
                type: 'string',
                title: 'Description'
            }
        }
    },
    ui_schema: {
        title: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'editor'
        }
    },
    form_data: {}
};

export const PostFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Post',
        description: '',
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                title: 'Title'
            },
            description: {
                type: 'string',
                title: 'Description'
            },
            files_url: {
                type: 'string',
                title: 'Files'
            }
        }
    },
    ui_schema: {
        title: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'editor'
        },
        files_url: {
            'ui:widget': 'files'
        }
    },
    form_data: {}
};

export const UserFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Profile',
        description: '',
        required: ['name'],
        properties: {
            avatar: {
                type: 'string',
                title: 'Avatar'
            },
            name: {
                type: 'string',
                title: 'Name'
            },
            email: {
                type: 'string',
                title: 'Email'
            },
            nickname: {
                type: 'string',
                title: 'Nick Name'
            },
            age: {
                type: 'integer',
                title: 'Age',
                default: 0
            },
            sex: {
                type: 'string',
                title: 'Sex',
                oneOf: [
                    { title: 'Male', const: 'male' },
                    { title: 'Female', const: 'female' }
                ],
                default: 'male'
            },
            password: {
                type: 'string',
                title: 'Password',
                minLength: 6
            },
            confirmPassword: {
                type: 'string',
                title: 'Confirm Password',
                minLength: 6
            }
        }
    },
    ui_schema: {
        name: {
            'ui:widget': 'text'
        },
        nickname: {
            'ui:widget': 'text'
        },
        age: {
            'ui:widget': 'updown'
        },

        email: {
            // "ui:disabled": true,
            'ui:widget': 'text',
            'ui:readonly': true
        },
        sex: {
            'ui:widget': 'select'
        },
        avatar: {
            'ui:widget': 'image'
        },
        password: {
            'ui:widget': 'password'
        },
        confirmPassword: {
            'ui:widget': 'password'
        }
    },
    form_data: {}
};

export const CampaignFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Campaign',
        description: '',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                title: 'Campaign Name'
            },
            description: {
                type: 'string',
                title: 'Description'
            },
            category: {
                type: 'string',
                title: 'Campaign Type',
                oneOf: [
                    { title: 'Press Release', const: 'press_release' },
                    { title: 'Product Launch', const: 'product_aunch' },
                    { title: 'Event Announcement', const: 'event_announcement' },
                    { title: 'Crisis Management', const: 'crisis_management' },
                    { title: 'Brand Awareness', const: 'crand_awareness' }
                ]
            },
            people: {
                type: 'integer',
                title: 'Projected reach'
            },
            location: {
                type: 'string',
                title: 'Location'
            },
            start_at: {
                type: 'string',
                title: 'Start Date'
            },
            end_at: {
                type: 'string',
                title: 'End Date'
            },

            press_release: {
                type: 'string',
                title: 'Press Release'
            },
            files_url: {
                type: 'string',
                title: 'Images'
            },
            medias: {
                type: 'array',
                title: 'Promoto channel',
                items: {
                    type: 'object'
                    // 可以根据你的媒体对象结构补充 properties
                }
            }
        }
    },
    ui_schema: {
        name: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'textarea'
        },
        press_release: {
            'ui:widget': 'editor'
        },
        files_url: {
            'ui:widget': 'files'
        },
        people: {
            'ui:widget': 'updown'
        },
        category: {
            'ui:widget': 'select'
        },
        start_at: {
            'ui:widget': 'date'
        },
        end_at: {
            'ui:widget': 'date'
        },
        medias: {
            'ui:widget': 'medias'
        }
    },
    form_data: {
        name: '',
        category: '',
        description: '',
        press_release: '',
        people: 0,
        medias: []
    }
};

export const MediaFormData = {
    json_schema: {
        type: 'object',
        title: 'Edit Media',
        description: '',
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                title: 'Media Name'
            },
            description: {
                type: 'string',
                title: 'Description'
            },
            category: {
                type: 'string',
                title: 'Media Type',
                oneOf: [
                    { title: 'Newspaper', const: 'newspaper' },
                    { title: 'Magazine', const: 'magazine' }
                ]
            },
            industry: {
                type: 'string',
                title: 'Industry'
            },
            region: {
                type: 'string',
                title: 'Region'
            },
            city: {
                type: 'string',
                title: 'City'
            },
            tags: {
                type: 'array',
                title: 'Tag',
                items: {
                    type: 'string'
                    // 可以根据你的媒体对象结构补充 properties
                }
            }
        }
    },
    ui_schema: {
        name: {
            'ui:widget': 'text'
        },
        description: {
            'ui:widget': 'textarea'
        },
        category: {
            'ui:widget': 'select'
        },
        industry: {
            'ui:widget': 'text'
        },
        region: {
            'ui:widget': 'text'
        },
        city: {
            'ui:widget': 'text'
        },
        tags: {
            'ui:widget': 'tag'
        }
    },
    form_data: {
        name: '',
        category: '',
        description: ''
    }
};
