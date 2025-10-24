import React from 'react';
import { School } from '../types/recommendation';

interface SchoolCardProps {
  school: School;
  onMajorClick: (schoolId: string) => void;
}

const getProbabilityColor = (probability: number) => {
  if (probability >= 70) return 'bg-green-100 text-green-800';
  if (probability >= 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const SchoolCard: React.FC<SchoolCardProps> = ({ school, onMajorClick }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border-l-4 border-blue-500">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{school.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {school.location} · {school.type}
        </p>
        <div className="mt-2 flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
            位次差: {school.rankDifference > 0 ? `+${school.rankDifference}` : school.rankDifference}
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${getProbabilityColor(school.admissionProbability)}`}>
            录取概率: {school.admissionProbability}%
          </span>
        </div>
      </div>
      <button
        onClick={() => onMajorClick(school.id)}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
      >
        查看专业
      </button>
    </div>
  </div>
);

export default SchoolCard;
