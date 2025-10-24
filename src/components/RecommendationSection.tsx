import React from 'react';
import { School, RecommendationTier } from '../types/recommendation';
import SchoolCard from './SchoolCard';

interface RecommendationSectionProps {
  tier: RecommendationTier;
  schools: School[];
  onMajorClick: (schoolId: string) => void;
}

const tierTitles = {
  '冲': '冲志愿区',
  '稳': '稳志愿区',
  '保': '保志愿区'
};

const tierColors = {
  '冲': 'from-red-500 to-red-600',
  '稳': 'from-yellow-500 to-yellow-600',
  '保': 'from-green-500 to-green-600'
};

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  tier,
  schools,
  onMajorClick,
}) => {
  return (
    <div className="mb-8">
      <div className={`bg-gradient-to-r ${tierColors[tier]} text-white px-4 py-2 rounded-t-lg`}>
        <h2 className="text-lg font-semibold">{tierTitles[tier]}</h2>
      </div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-b-lg p-4">
        {schools.length > 0 ? (
          <div className="space-y-4">
            {schools.map((school) => (
              <SchoolCard
                key={school.id}
                school={school}
                onMajorClick={onMajorClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            暂无推荐院校，请调整筛选条件
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
