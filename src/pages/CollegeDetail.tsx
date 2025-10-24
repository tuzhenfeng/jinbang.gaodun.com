
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colleges, College } from '../data/mockData';
import ReactECharts from 'echarts-for-react';
import { ArrowLeftIcon, BookmarkIcon, ShareIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';

interface Major {
  id: string;
  name: string;
  score: number;
  employmentRate: number;
  matchScore: number;
  description: string;
}

interface CollegeDetail extends College {
  description: string;
  cityInfo: string;
  imageUrl: string;
  majors: Major[];
  isFavorite?: boolean;
}

const collegeDetails: CollegeDetail[] = [
  {
    ...colleges[0],
    description: '青春大学是一所综合性研究型大学，拥有优秀的师资力量和丰富的教学资源。',
    cityInfo: '北京市，中国的首都，全国政治、文化、国际交往和科技创新中心。',
    imageUrl: 'https://example.com/college1.jpg',
    isFavorite: false,
    majors: [
      { id: 'm1', name: '计算机科学与技术', score: 650, employmentRate: 98, matchScore: 92, description: '培养计算机领域的高级专门人才' },
      { id: 'm2', name: '人工智能', score: 645, employmentRate: 96, matchScore: 88, description: '研究人工智能理论与应用的前沿学科' },
      { id: 'm3', name: '数据科学与大数据技术', score: 640, employmentRate: 97, matchScore: 85, description: '培养大数据分析与应用的专业人才' },
    ]
  },
  // Add more college details as needed
];

export default function CollegeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const college = collegeDetails.find(c => c.id === id) || collegeDetails[0];
  const [isFavorite, setIsFavorite] = useState(college.isFavorite || false);

  const scoreOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}年: {c}分'
    },
    xAxis: { 
      type: 'category', 
      data: ['2023', '2022', '2021'],
      axisLine: { lineStyle: { color: '#e0e0e0' } },
      axisLabel: { color: '#666' }
    },
    yAxis: { 
      type: 'value',
      min: 500,
      max: 700,
      axisLine: { show: true, lineStyle: { color: '#e0e0e0' } },
      splitLine: { lineStyle: { type: 'dashed' } },
      axisLabel: { color: '#666' }
    },
    series: [{
      type: 'line',
      data: college.scoreLine,
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: {
        color: '#3b82f6',
        width: 3
      },
      itemStyle: {
        color: '#3b82f6',
        borderColor: '#fff',
        borderWidth: 2
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'rgba(59, 130, 246, 0.2)'
          }, {
            offset: 1, color: 'rgba(59, 130, 246, 0.02)'
          }]
        }
      }
    }],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add API call to update favorite status
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    alert('分享功能开发中...');
  };

  const handleAddToPlan = () => {
    // TODO: Implement add to plan functionality
    alert('已添加到志愿表');
  };

  const handleCompare = () => {
    // TODO: Implement compare functionality
    alert('对比功能开发中...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header with back button and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            返回
          </button>
          <button 
            onClick={handleFavorite}
            className={`p-2 rounded-full ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
            aria-label={isFavorite ? '已收藏' : '收藏'}
            title={isFavorite ? '已收藏' : '收藏'}
          >
            {isFavorite ? (
              <StarIcon className="h-6 w-6 fill-current" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleShare}
            className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 rounded-full"
            aria-label="分享"
            title="分享"
          >
            <ShareIcon className="h-6 w-6" />
          </button>
          <button 
            onClick={handleAddToPlan}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2"
          >
            <HeartIcon className="h-5 w-5" />
            <span>加入志愿</span>
          </button>
        </div>
      </div>

      {/* College basic info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{college.name}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span>所在省份：{college.province}</span>
          <span>院校层次：{college.tier}</span>
          <span>招生人数：{college.enroll}人</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {college.tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-700 dark:text-gray-300">{college.description}</p>
      </div>

      {/* Score trend chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">近三年录取分数线</h2>
        <div className="h-80">
          <ReactECharts option={scoreOption} style={{ height: '100%' }} />
        </div>
      </div>

      {/* Majors section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">专业推荐</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">专业名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">录取分数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">就业率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">匹配度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {college.majors.map((major) => (
                <tr key={major.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{major.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{major.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{major.score}分</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${major.employmentRate}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{major.employmentRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${major.matchScore}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{major.matchScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* City and college info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">城市介绍</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{college.cityInfo}</p>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt={college.province}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">校园风光</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Main campus view */}
            <div className="relative rounded-lg overflow-hidden group col-span-1 sm:col-span-2 lg:col-span-3 h-64">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                alt={`${college.name}主校区`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white text-lg font-medium">{college.name}主校区</span>
              </div>
            </div>
            
            {/* Library */}
            <div className="relative rounded-lg overflow-hidden group h-48">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt={`${college.name}图书馆`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">图书馆</span>
              </div>
            </div>
            
            {/* Dormitory */}
            <div className="relative rounded-lg overflow-hidden group h-48">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt={`${college.name}学生宿舍`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">学生宿舍</span>
              </div>
            </div>
            
            {/* Sports facilities */}
            <div className="relative rounded-lg overflow-hidden group h-48">
              <img
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt={`${college.name}体育设施`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">体育设施</span>
              </div>
            </div>
            
            {/* Campus life with high-quality image */}
            <div className="relative rounded-lg overflow-hidden group h-48 bg-gray-100 dark:bg-gray-700">
              <img
                src={
                  college.name === '青春大学' 
                    ? 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
                    : 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80'
                }
                alt={`${college.name}校园生活`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">校园生活</span>
              </div>
            </div>
            
            {/* Campus landscape 1 */}
            <div className="relative rounded-lg overflow-hidden group h-48">
              <img
                src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                alt={`${college.name}校园景色`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">校园春色</span>
              </div>
            </div>
            
            {/* Campus landscape 2 - Additional scenery */}
            <div className="relative rounded-lg overflow-hidden group h-48">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                alt={`${college.name}校园秋景`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">校园秋景</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
