import React from 'react';

const RecommendPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">智能推荐</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-300">
          根据您的分数和兴趣，为您推荐最适合的院校和专业。
        </p>
        {/* 这里可以添加推荐表单和结果展示 */}
      </div>
    </div>
  );
};

export default RecommendPage;
