import React from 'react';

const MockFillPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">模拟填报</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-700 dark:text-gray-300">
          模拟高考志愿填报流程，提前熟悉填报界面和操作。
        </p>
        {/* 这里可以添加模拟填报的表单和交互 */}
      </div>
    </div>
  );
};

export default MockFillPage;
