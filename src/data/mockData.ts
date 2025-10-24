
export interface College {
  id: string;
  name: string;
  province: string;
  tier: string;
  scoreLine: number[];
  tags: string[];
  enroll: number;
  description: string;
  cityInfo: string;
  imageUrl: string;
  isFavorite?: boolean;
  majors: Array<{
    id: string;
    name: string;
    score: number;
    employmentRate: number;
    matchScore: number;
    description: string;
  }>;
}

export const colleges: College[] = [
  {
    id: 'c1',
    name: '清华大学',
    province: '北京',
    tier: '双一流/985/211',
    scoreLine: [695, 690, 685],
    tags: ['综合', '理工', '研究型'],
    enroll: 3800,
    description: '中国顶尖的综合性研究型大学，以工程和计算机科学闻名。',
    cityInfo: '北京市，中国的首都，全国政治、文化、国际交往和科技创新中心。',
    imageUrl: 'https://example.com/tsinghua.jpg',
    isFavorite: false,
    majors: [
      { id: 'm1-1', name: '计算机科学与技术', score: 715, employmentRate: 99, matchScore: 98, description: '培养计算机领域的高级专门人才' },
      { id: 'm1-2', name: '电子工程', score: 710, employmentRate: 98, matchScore: 95, description: '电子与信息工程领域的领先专业' },
      { id: 'm1-3', name: '建筑学', score: 705, employmentRate: 97, matchScore: 92, description: '培养建筑设计领域的专业人才' }
    ]
  },
  {
    id: 'c2',
    name: '北京大学',
    province: '北京',
    tier: '双一流/985/211',
    scoreLine: [693, 688, 683],
    tags: ['综合', '研究型', '文理并重'],
    enroll: 3600,
    description: '中国最古老的高等学府之一，以文理学科见长。',
    cityInfo: '北京市，中国的首都，全国政治、文化、国际交往和科技创新中心。',
    imageUrl: 'https://example.com/pku.jpg',
    isFavorite: false,
    majors: [
      { id: 'm2-1', name: '经济学', score: 713, employmentRate: 98, matchScore: 97, description: '培养经济理论研究和应用型人才' },
      { id: 'm2-2', name: '法学', score: 708, employmentRate: 96, matchScore: 94, description: '培养法律专业人才' },
      { id: 'm2-3', name: '中文系', score: 700, employmentRate: 95, matchScore: 90, description: '中国语言文学研究的重镇' }
    ]
  },
  {
    id: 'c3',
    name: '浙江大学',
    province: '浙江',
    tier: '双一流/985/211',
    scoreLine: [675, 670, 665],
    tags: ['综合', '研究型', '创新'],
    enroll: 6000,
    description: '中国学科最齐全的综合性研究型大学之一。',
    cityInfo: '杭州市，浙江省省会，中国电子商务之都。',
    imageUrl: 'https://example.com/zju.jpg',
    isFavorite: false,
    majors: [
      { id: 'm3-1', name: '计算机科学与技术', score: 700, employmentRate: 99, matchScore: 96, description: '计算机科学领域的顶尖专业' },
      { id: 'm3-2', name: '人工智能', score: 698, employmentRate: 98, matchScore: 95, description: '人工智能理论与应用的前沿学科' },
      { id: 'm3-3', name: '医学', score: 690, employmentRate: 97, matchScore: 92, description: '临床医学与基础医学并重' }
    ]
  },
  {
    id: 'c4',
    name: '复旦大学',
    province: '上海',
    tier: '双一流/985/211',
    scoreLine: [685, 680, 675],
    tags: ['综合', '研究型', '国际化'],
    enroll: 3500,
    description: '中国著名的高等学府，以人文社科和医学见长。',
    cityInfo: '上海市，中国最大的经济中心和国际化大都市。',
    imageUrl: 'https://example.com/fudan.jpg',
    isFavorite: false,
    majors: [
      { id: 'm4-1', name: '新闻学', score: 695, employmentRate: 96, matchScore: 94, description: '培养新闻传播领域的专业人才' },
      { id: 'm4-2', name: '临床医学', score: 705, employmentRate: 98, matchScore: 96, description: '八年制本博连读项目' },
      { id: 'm4-3', name: '国际政治', score: 685, employmentRate: 92, matchScore: 88, description: '培养国际关系领域的专业人才' }
    ]
  },
  {
    id: 'c5',
    name: '上海交通大学',
    province: '上海',
    tier: '双一流/985/211',
    scoreLine: [688, 683, 678],
    tags: ['理工', '研究型', '创新'],
    enroll: 4000,
    description: '中国历史最悠久、享誉海内外的著名高等学府之一。',
    cityInfo: '上海市，中国最大的经济中心和国际化大都市。',
    imageUrl: 'https://example.com/sjtu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm5-1', name: '机械工程', score: 698, employmentRate: 97, matchScore: 95, description: '机械工程领域的传统优势专业' },
      { id: 'm5-2', name: '电子信息类', score: 703, employmentRate: 98, matchScore: 96, description: '电子与信息工程领域的领先专业' },
      { id: 'm5-3', name: '船舶与海洋工程', score: 685, employmentRate: 95, matchScore: 90, description: '国内领先的船舶与海洋工程专业' }
    ]
  },
  {
    id: 'c6',
    name: '南京大学',
    province: '江苏',
    tier: '双一流/985/211',
    scoreLine: [665, 660, 655],
    tags: ['综合', '研究型', '文理并重'],
    enroll: 3300,
    description: '中国最古老的大学之一，文理学科均衡发展。',
    cityInfo: '南京市，江苏省省会，中国东部地区重要的中心城市。',
    imageUrl: 'https://example.com/nju.jpg',
    isFavorite: false,
    majors: [
      { id: 'm6-1', name: '天文学', score: 670, employmentRate: 94, matchScore: 90, description: '中国天文学研究的重镇' },
      { id: 'm6-2', name: '物理学', score: 675, employmentRate: 93, matchScore: 91, description: '基础学科研究的重要基地' },
      { id: 'm6-3', name: '哲学', score: 660, employmentRate: 88, matchScore: 85, description: '培养哲学理论研究的专业人才' }
    ]
  },
  {
    id: 'c7',
    name: '中国科学技术大学',
    province: '安徽',
    tier: '双一流/985/211',
    scoreLine: [675, 670, 665],
    tags: ['理工', '研究型', '创新'],
    enroll: 1800,
    description: '中国科学院直属的综合性全国重点大学。',
    cityInfo: '合肥市，安徽省省会，国家重要的科研教育基地。',
    imageUrl: 'https://example.com/ustc.jpg',
    isFavorite: false,
    majors: [
      { id: 'm7-1', name: '物理学', score: 695, employmentRate: 97, matchScore: 96, description: '中国物理学研究的重镇' },
      { id: 'm7-2', name: '计算机科学与技术', score: 700, employmentRate: 99, matchScore: 98, description: '培养计算机科学领域的顶尖人才' },
      { id: 'm7-3', name: '数学', score: 690, employmentRate: 96, matchScore: 95, description: '基础数学与应用数学并重' }
    ]
  },
  {
    id: 'c8',
    name: '哈尔滨工业大学',
    province: '黑龙江',
    tier: '双一流/985/211',
    scoreLine: [650, 645, 640],
    tags: ['理工', '国防', '工程'],
    enroll: 4000,
    description: '中国著名的理工科大学，以工科见长。',
    cityInfo: '哈尔滨市，黑龙江省省会，中国北方的工业重镇。',
    imageUrl: 'https://example.com/hit.jpg',
    isFavorite: false,
    majors: [
      { id: 'm8-1', name: '航天工程', score: 675, employmentRate: 98, matchScore: 95, description: '中国航天工程的重要人才培养基地' },
      { id: 'm8-2', name: '机器人工程', score: 670, employmentRate: 97, matchScore: 94, description: '机器人技术研发的前沿专业' },
      { id: 'm8-3', name: '材料科学与工程', score: 665, employmentRate: 96, matchScore: 92, description: '新材料研发的重要基地' }
    ]
  },
  {
    id: 'c9',
    name: '武汉大学',
    province: '湖北',
    tier: '双一流/985/211',
    scoreLine: [655, 650, 645],
    tags: ['综合', '研究型', '风景优美'],
    enroll: 5000,
    description: '中国著名的综合性研究型大学，校园环境优美。',
    cityInfo: '武汉市，湖北省省会，中国中部地区的中心城市。',
    imageUrl: 'https://example.com/whu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm9-1', name: '测绘科学与技术', score: 665, employmentRate: 95, matchScore: 93, description: '国内领先的测绘工程专业' },
      { id: 'm9-2', name: '法学', score: 670, employmentRate: 94, matchScore: 91, description: '法学教育的重要基地' },
      { id: 'm9-3', name: '口腔医学', score: 675, employmentRate: 97, matchScore: 94, description: '口腔医学领域的优势专业' }
    ]
  },
  {
    id: 'c10',
    name: '中山大学',
    province: '广东',
    tier: '双一流/985/211',
    scoreLine: [650, 645, 640],
    tags: ['综合', '研究型', '国际化'],
    enroll: 4500,
    description: '中国南方科学研究、文化学术与人才培养的重镇。',
    cityInfo: '广州市，广东省省会，中国南方的经济中心。',
    imageUrl: 'https://example.com/sysu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm10-1', name: '临床医学', score: 680, employmentRate: 98, matchScore: 96, description: '八年制本博连读项目' },
      { id: 'm10-2', name: '管理学', score: 665, employmentRate: 95, matchScore: 92, description: '培养管理领域的专业人才' },
      { id: 'm10-3', name: '社会学', score: 650, employmentRate: 90, matchScore: 86, description: '社会学理论研究的重镇' }
    ]
  },
  {
    id: 'c11',
    name: '西安交通大学',
    province: '陕西',
    tier: '双一流/985/211',
    scoreLine: [660, 655, 650],
    tags: ['理工', '研究型', '创新'],
    enroll: 3800,
    description: '中国最早兴办的高等学府之一，以工科见长。',
    cityInfo: '西安市，陕西省省会，中国西部地区重要的中心城市。',
    imageUrl: 'https://example.com/xjtu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm11-1', name: '能源与动力工程', score: 670, employmentRate: 97, matchScore: 94, description: '能源动力领域的优势专业' },
      { id: 'm11-2', name: '电气工程及其自动化', score: 675, employmentRate: 98, matchScore: 96, description: '电气工程领域的领先专业' },
      { id: 'm11-3', name: '机械工程', score: 665, employmentRate: 96, matchScore: 93, description: '机械工程领域的传统优势专业' }
    ]
  },
  {
    id: 'c12',
    name: '华中科技大学',
    province: '湖北',
    tier: '双一流/985/211',
    scoreLine: [655, 650, 645],
    tags: ['理工', '医科', '研究型'],
    enroll: 4500,
    description: '中国著名的综合性研究型大学，工科和医科并重。',
    cityInfo: '武汉市，湖北省省会，中国中部地区的中心城市。',
    imageUrl: 'https://example.com/hust.jpg',
    isFavorite: false,
    majors: [
      { id: 'm12-1', name: '机械工程', score: 670, employmentRate: 97, matchScore: 95, description: '机械工程领域的传统优势专业' },
      { id: 'm12-2', name: '临床医学', score: 680, employmentRate: 98, matchScore: 96, description: '八年制本博连读项目' },
      { id: 'm12-3', name: '光电信息科学与工程', score: 665, employmentRate: 96, matchScore: 93, description: '光电信息领域的优势专业' }
    ]
  },
  {
    id: 'c13',
    name: '北京航空航天大学',
    province: '北京',
    tier: '双一流/985/211',
    scoreLine: [665, 660, 655],
    tags: ['理工', '国防', '航天'],
    enroll: 3000,
    description: '中国航空航天领域的重要人才培养基地。',
    cityInfo: '北京市，中国的首都，全国政治、文化、国际交往和科技创新中心。',
    imageUrl: 'https://example.com/buaa.jpg',
    isFavorite: false,
    majors: [
      { id: 'm13-1', name: '飞行器设计与工程', score: 680, employmentRate: 98, matchScore: 96, description: '培养飞行器设计领域的专业人才' },
      { id: 'm13-2', name: '计算机科学与技术', score: 675, employmentRate: 99, matchScore: 97, description: '计算机科学领域的优势专业' },
      { id: 'm13-3', name: '材料科学与工程', score: 665, employmentRate: 96, matchScore: 93, description: '新材料研发的重要基地' }
    ]
  },
  {
    id: 'c14',
    name: '南开大学',
    province: '天津',
    tier: '双一流/985/211',
    scoreLine: [650, 645, 640],
    tags: ['综合', '研究型', '文理并重'],
    enroll: 3500,
    description: '中国著名的高等学府，以文理学科见长。',
    cityInfo: '天津市，中国北方重要的经济中心和港口城市。',
    imageUrl: 'https://example.com/nankai.jpg',
    isFavorite: false,
    majors: [
      { id: 'm14-1', name: '数学', score: 665, employmentRate: 95, matchScore: 93, description: '基础数学研究的重镇' },
      { id: 'm14-2', name: '化学', score: 660, employmentRate: 94, matchScore: 91, description: '化学研究的重要基地' },
      { id: 'm14-3', name: '经济学', score: 670, employmentRate: 96, matchScore: 94, description: '经济理论研究的重镇' }
    ]
  },
  {
    id: 'c15',
    name: '天津大学',
    province: '天津',
    tier: '双一流/985/211',
    scoreLine: [655, 650, 645],
    tags: ['理工', '研究型', '工程'],
    enroll: 3800,
    description: '中国第一所现代大学，以工科见长。',
    cityInfo: '天津市，中国北方重要的经济中心和港口城市。',
    imageUrl: 'https://example.com/tju.jpg',
    isFavorite: false,
    majors: [
      { id: 'm15-1', name: '化学工程与工艺', score: 665, employmentRate: 97, matchScore: 95, description: '化学工程领域的传统优势专业' },
      { id: 'm15-2', name: '建筑学', score: 670, employmentRate: 96, matchScore: 94, description: '建筑设计与理论的重要基地' },
      { id: 'm15-3', name: '仪器科学与技术', score: 660, employmentRate: 95, matchScore: 92, description: '精密仪器与测试技术的前沿专业' }
    ]
  },
  {
    id: 'c16',
    name: '厦门大学',
    province: '福建',
    tier: '双一流/985/211',
    scoreLine: [645, 640, 635],
    tags: ['综合', '研究型', '风景优美'],
    enroll: 4000,
    description: '中国近代教育史上第一所华侨创办的大学。',
    cityInfo: '厦门市，福建省副省级城市，中国著名的海滨旅游城市。',
    imageUrl: 'https://example.com/xmu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm16-1', name: '会计学', score: 665, employmentRate: 97, matchScore: 95, description: '会计学领域的优势专业' },
      { id: 'm16-2', name: '海洋科学', score: 650, employmentRate: 94, matchScore: 90, description: '海洋科学研究的重要基地' },
      { id: 'm16-3', name: '经济学', score: 660, employmentRate: 96, matchScore: 93, description: '经济理论研究的重镇' }
    ]
  },
  {
    id: 'c17',
    name: '四川大学',
    province: '四川',
    tier: '双一流/985/211',
    scoreLine: [640, 635, 630],
    tags: ['综合', '研究型', '医科'],
    enroll: 6000,
    description: '中国西部地区的著名高等学府，学科门类齐全。',
    cityInfo: '成都市，四川省省会，中国西部地区的中心城市。',
    imageUrl: 'https://example.com/scu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm17-1', name: '口腔医学', score: 670, employmentRate: 98, matchScore: 96, description: '口腔医学领域的优势专业' },
      { id: 'm17-2', name: '临床医学', score: 665, employmentRate: 97, matchScore: 95, description: '临床医学教育的重要基地' },
      { id: 'm17-3', name: '高分子材料与工程', score: 650, employmentRate: 95, matchScore: 91, description: '高分子材料研究的重要基地' }
    ]
  },
  {
    id: 'c18',
    name: '东南大学',
    province: '江苏',
    tier: '双一流/985/211',
    scoreLine: [650, 645, 640],
    tags: ['理工', '建筑', '研究型'],
    enroll: 3200,
    description: '中国著名的理工科大学，以建筑和土木工程见长。',
    cityInfo: '南京市，江苏省省会，中国东部地区重要的中心城市。',
    imageUrl: 'https://example.com/seu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm18-1', name: '建筑学', score: 670, employmentRate: 97, matchScore: 95, description: '建筑设计与理论的重要基地' },
      { id: 'm18-2', name: '土木工程', score: 665, employmentRate: 96, matchScore: 94, description: '土木工程领域的传统优势专业' },
      { id: 'm18-3', name: '生物医学工程', score: 655, employmentRate: 95, matchScore: 92, description: '生物医学工程领域的前沿专业' }
    ]
  },
  {
    id: 'c19',
    name: '同济大学',
    province: '上海',
    tier: '双一流/985/211',
    scoreLine: [660, 655, 650],
    tags: ['理工', '建筑', '研究型'],
    enroll: 3500,
    description: '中国著名的综合性研究型大学，以土木建筑、环境、海洋等学科见长。',
    cityInfo: '上海市，中国最大的经济中心和国际化大都市。',
    imageUrl: 'https://example.com/tongji.jpg',
    isFavorite: false,
    majors: [
      { id: 'm19-1', name: '土木工程', score: 670, employmentRate: 98, matchScore: 96, description: '土木工程领域的传统优势专业' },
      { id: 'm19-2', name: '建筑学', score: 675, employmentRate: 97, matchScore: 95, description: '建筑设计与理论的重要基地' },
      { id: 'm19-3', name: '车辆工程', score: 665, employmentRate: 96, matchScore: 93, description: '汽车工程领域的优势专业' }
    ]
  },
  {
    id: 'c20',
    name: '北京师范大学',
    province: '北京',
    tier: '双一流/985/211',
    scoreLine: [650, 645, 640],
    tags: ['师范', '综合', '研究型'],
    enroll: 2500,
    description: '中国历史最悠久的现代高等师范学府。',
    cityInfo: '北京市，中国的首都，全国政治、文化、国际交往和科技创新中心。',
    imageUrl: 'https://example.com/bnu.jpg',
    isFavorite: false,
    majors: [
      { id: 'm20-1', name: '教育学', score: 665, employmentRate: 95, matchScore: 93, description: '教育学研究的重镇' },
      { id: 'm20-2', name: '心理学', score: 660, employmentRate: 94, matchScore: 91, description: '心理学研究的重要基地' },
      { id: 'm20-3', name: '中国语言文学', score: 655, employmentRate: 92, matchScore: 88, description: '中国语言文学研究的重镇' }
    ]
  }
]
