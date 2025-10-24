import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { School } from '../types/recommendation';
import Button from '../components/ui/Button';
import { ArrowLeftIcon, BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';

// Mock data for recommended schools based on assessment
const getRecommendedSchools = (assessmentType: string): School[] => {
  const baseRecommendations: Record<string, School[]> = {
    '现实型': [
      {
        id: '101',
        name: '清华大学',
        location: '北京',
        type: '985',
        rank: 1,
        admissionProbability: 65,
        rankDifference: 300,
        batch: '本科一批',
        recommendedMajors: ['机械工程', '计算机科学与技术', '自动化']
      },
      {
        id: '102',
        name: '上海交通大学',
        location: '上海',
        type: '985',
        rank: 5,
        admissionProbability: 72,
        rankDifference: 250,
        batch: '本科一批',
        recommendedMajors: ['船舶与海洋工程', '电子与计算机工程', '人工智能']
      }
    ],
    '研究型': [
      {
        id: '201',
        name: '北京大学',
        location: '北京',
        type: '985',
        rank: 2,
        admissionProbability: 60,
        rankDifference: 350,
        batch: '本科一批',
        recommendedMajors: ['数学与应用数学', '物理学', '生物科学']
      },
      {
        id: '202',
        name: '中国科学技术大学',
        location: '安徽',
        type: '985',
        rank: 8,
        admissionProbability: 75,
        rankDifference: 200,
        batch: '本科一批',
        recommendedMajors: ['物理学', '化学', '天文学']
      }
    ],
    '艺术型': [
      {
        id: '301',
        name: '中央美术学院',
        location: '北京',
        type: '211',
        rank: 150,
        admissionProbability: 55,
        rankDifference: 400,
        batch: '艺术类本科',
        recommendedMajors: ['绘画', '雕塑', '视觉传达设计']
      },
      {
        id: '302',
        name: '中国传媒大学',
        location: '北京',
        type: '211',
        rank: 120,
        admissionProbability: 65,
        rankDifference: 300,
        batch: '本科一批',
        recommendedMajors: ['广播电视编导', '播音与主持艺术', '数字媒体艺术']
      }
    ]
  };

  // Default recommendations if no specific type matches
  const defaultRecs = [
    {
      id: '999',
      name: '浙江大学',
      location: '浙江',
      type: '985',
      rank: 3,
      admissionProbability: 70,
      rankDifference: 280,
      batch: '本科一批',
      recommendedMajors: ['计算机科学与技术', '电子信息工程', '人工智能']
    }
  ];

  return baseRecommendations[assessmentType] || defaultRecs;
};

const AssessmentRecommendations: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get assessment results from location state
  const assessmentResults = location.state?.assessmentResults || [];
  const primaryType = assessmentResults[0]?.type || '研究型';
  
  const recommendedSchools = getRecommendedSchools(primaryType);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('已保存推荐结果');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('分享功能开发中');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            返回
          </Button>
          <div className="flex space-x-3">
            <Button
              onClick={handleSave}
              variant="outline"
              className="flex items-center"
            >
              <BookmarkIcon className="h-5 w-5 mr-2" />
              保存
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center"
            >
              <ShareIcon className="h-5 w-5 mr-2" />
              分享
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            基于<span className="text-blue-600 dark:text-blue-400 mx-2">{primaryType}</span>兴趣类型的院校推荐
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            根据您的兴趣测评结果，我们为您推荐以下院校和专业。这些推荐基于您的兴趣类型、历年录取数据以及专业匹配度。
          </p>
          
          <div className="space-y-6">
            {recommendedSchools.map((school) => (
              <div key={school.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {school.name}
                      </h2>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{school.location}</span>
                        <span className="mx-2">•</span>
                        <span>{school.type}</span>
                        <span className="mx-2">•</span>
                        <span>排名: {school.rank}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-center px-4">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {school.admissionProbability}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          录取概率
                        </div>
                      </div>
                      <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 mx-4"></div>
                      <div className="text-center px-4">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {school.rankDifference > 0 ? `+${school.rankDifference}` : school.rankDifference}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          位次差
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      推荐专业:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {school.recommendedMajors.map((major, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-200"
                        >
                          {major}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex justify-end">
                  <Button
                    onClick={() => {
                      navigate(`/colleges/${school.id}`, { state: { fromAssessment: true } });
                    }}
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    查看详情
                  </Button>
                  <Button
                    onClick={() => {
                      // Add to my plan
                      alert(`已添加${school.name}到志愿表`);
                    }}
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    加入志愿表
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            专业发展建议
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              作为<span className="font-medium text-blue-600 dark:text-blue-400">{primaryType}</span>型人才，您在以下领域可能具有优势：
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              {assessmentResults[0]?.careerPaths?.map((path: string, index: number) => (
                <li key={index}>{path}</li>
              )) || <li>暂无具体建议，请完成测评获取更详细的职业发展建议。</li>}
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
                下一步建议：
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-blue-700 dark:text-blue-300">
                <li>详细了解推荐专业的课程设置和就业方向</li>
                <li>参加相关专业的开放日或咨询会</li>
                <li>与在校生或毕业生交流，了解专业实际学习体验</li>
                <li>考虑参加相关专业的先修课程或线上课程</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRecommendations;
