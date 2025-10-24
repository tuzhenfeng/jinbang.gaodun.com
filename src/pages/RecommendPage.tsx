import React, { useState, useEffect } from 'react';
import { School, RecommendationTier, FilterOptions } from '../types/recommendation';
import FilterBar from '../components/FilterBar';
import RecommendationSection from '../components/RecommendationSection';
import AdmissionProbabilityChart from '../components/AdmissionProbabilityChart';
import InterestMatchingChart from '../components/InterestMatchingChart';
import { useNavigate } from 'react-router-dom';

// Mock data - in a real app, this would come from an API
const mockSchools: School[] = [
  {
    id: '1',
    name: '清华大学',
    location: '北京',
    type: '985',
    rank: 1,
    admissionProbability: 30,
    rankDifference: 500,
    batch: '本科一批',
    recommendedMajors: ['计算机科学与技术', '电子信息工程', '人工智能']
  },
  {
    id: '2',
    name: '北京大学',
    location: '北京',
    type: '985',
    rank: 2,
    admissionProbability: 25,
    rankDifference: 600,
    batch: '本科一批',
    recommendedMajors: ['经济学', '法学', '国际关系']
  },
  {
    id: '3',
    name: '浙江大学',
    location: '浙江',
    type: '985',
    rank: 3,
    admissionProbability: 65,
    rankDifference: 100,
    batch: '本科一批',
    recommendedMajors: ['计算机科学与技术', '软件工程', '数据科学']
  },
  {
    id: '4',
    name: '复旦大学',
    location: '上海',
    type: '985',
    rank: 4,
    admissionProbability: 70,
    rankDifference: 50,
    batch: '本科一批',
    recommendedMajors: ['新闻传播学', '经济学', '临床医学']
  },
  {
    id: '5',
    name: '上海交通大学',
    location: '上海',
    type: '985',
    rank: 5,
    admissionProbability: 75,
    rankDifference: 0,
    batch: '本科一批',
    recommendedMajors: ['电子信息类', '机械工程', '船舶与海洋工程']
  },
  {
    id: '6',
    name: '南京大学',
    location: '江苏',
    type: '985',
    rank: 6,
    admissionProbability: 80,
    rankDifference: -100,
    batch: '本科一批',
    recommendedMajors: ['天文学', '物理学', '计算机科学与技术']
  },
  {
    id: '7',
    name: '武汉大学',
    location: '湖北',
    type: '985',
    rank: 7,
    admissionProbability: 85,
    rankDifference: -200,
    batch: '本科一批',
    recommendedMajors: ['测绘工程', '法学', '经济学']
  },
  {
    id: '8',
    name: '华中科技大学',
    location: '湖北',
    type: '985',
    rank: 8,
    admissionProbability: 90,
    rankDifference: -300,
    batch: '本科一批',
    recommendedMajors: ['机械工程', '电气工程', '计算机科学与技术']
  },
  {
    id: '9',
    name: '四川大学',
    location: '四川',
    type: '985',
    rank: 9,
    admissionProbability: 95,
    rankDifference: -500,
    batch: '本科一批',
    recommendedMajors: ['口腔医学', '临床医学', '计算机科学与技术']
  },
];

// Mock chart data
const admissionData = {
  labels: ['冲志愿', '稳志愿', '保志愿'],
  datasets: [
    {
      label: '录取概率',
      data: [30, 65, 90],
      backgroundColor: 'rgba(79, 70, 229, 0.5)',
    },
  ],
};

const interestData = {
  labels: ['计算机', '经济', '医学', '工程', '自然科学', '人文社科'],
  datasets: [
    {
      label: '兴趣匹配度',
      data: [90, 75, 60, 80, 70, 65],
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      borderColor: 'rgba(79, 70, 229, 1)',
      borderWidth: 2,
    },
  ],
};

const RecommendPage: React.FC = () => {
  const [filteredSchools, setFilteredSchools] = useState<Record<RecommendationTier, School[]>>({
    '冲': [],
    '稳': [],
    '保': []
  });
  const navigate = useNavigate();

  // Initialize with mock data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRecommendations = () => {
      // Simulate API call
      setTimeout(() => {
        setFilteredSchools({
          '冲': mockSchools.filter(school => school.admissionProbability < 50),
          '稳': mockSchools.filter(school => school.admissionProbability >= 50 && school.admissionProbability < 80),
          '保': mockSchools.filter(school => school.admissionProbability >= 80)
        });
      }, 500);
    };

    fetchRecommendations();
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    // In a real app, this would be an API call with filters
    console.log('Applying filters:', filters);
    // For demo purposes, we'll just filter the mock data
    let result = [...mockSchools];
    
    if (filters.region) {
      result = result.filter(school => school.location === filters.region);
    }
    
    if (filters.schoolType) {
      result = result.filter(school => school.type === filters.schoolType);
    }
    
    if (filters.batch) {
      result = result.filter(school => school.batch === filters.batch);
    }
    
    setFilteredSchools({
      '冲': result.filter(school => school.admissionProbability < 50),
      '稳': result.filter(school => school.admissionProbability >= 50 && school.admissionProbability < 80),
      '保': result.filter(school => school.admissionProbability >= 80)
    });
  };

  const handleMajorClick = (schoolId: string) => {
    // Navigate to major selection page
    navigate(`/schools/${schoolId}/majors`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">智能推荐</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1">
          <FilterBar onFilterChange={handleFilterChange} />
          
          <div className="space-y-8">
            {(['冲', '稳', '保'] as RecommendationTier[]).map((tier) => (
              <RecommendationSection
                key={tier}
                tier={tier}
                schools={filteredSchools[tier]}
                onMajorClick={handleMajorClick}
              />
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <AdmissionProbabilityChart applications={[
            ...filteredSchools['冲'].map(school => ({
              id: parseInt(school.id),
              school: school.name,
              major: school.recommendedMajors?.[0] || '未指定',
              batch: school.batch,
              probability: school.admissionProbability
            })),
            ...filteredSchools['稳'].map(school => ({
              id: parseInt(school.id) + 100, // Add offset to avoid ID conflicts
              school: school.name,
              major: school.recommendedMajors?.[0] || '未指定',
              batch: school.batch,
              probability: school.admissionProbability
            })),
            ...filteredSchools['保'].map(school => ({
              id: parseInt(school.id) + 200, // Add larger offset to avoid ID conflicts
              school: school.name,
              major: school.recommendedMajors?.[0] || '未指定',
              batch: school.batch,
              probability: school.admissionProbability
            }))
          ]} />
          <InterestMatchingChart data={interestData} />
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
