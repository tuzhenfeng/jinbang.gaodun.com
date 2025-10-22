import React from 'react';

const CollegesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">院校库</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-300">
          浏览全国各高校信息，包括录取分数线、专业设置等。
        </p>
        {/* 这里可以添加院校列表和筛选功能 */}
      </div>
    </div>
  );
};

export default CollegesPage;
