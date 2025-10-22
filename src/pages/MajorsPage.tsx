import React from 'react';

const MajorsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">专业库</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-300">
          了解各个专业的详细信息，包括就业前景、课程设置等。
        </p>
        {/* 这里可以添加专业列表和筛选功能 */}
      </div>
    </div>
  );
};

export default MajorsPage;
