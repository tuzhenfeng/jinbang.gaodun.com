import React, { useState } from 'react';
import { PlusIcon, TrashIcon, DocumentArrowDownIcon, DocumentArrowUpIcon, ArrowPathIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import TableHead from '../components/ui/TableHead';
import TableRow from '../components/ui/TableRow';
import TableHeader from '../components/ui/TableHeader';
import TableCell from '../components/ui/TableCell';
import TableBody from '../components/ui/TableBody';
// Card components will be implemented separately
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);
import AdmissionProbabilityChart from '../components/AdmissionProbabilityChart';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Custom dropdown arrow SVG
const DropdownArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface Application {
  id: number;
  school: string;
  major: string;
  batch: string;
  probability: number;
}

const MockFillPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, school: '清华大学', major: '计算机科学与技术', batch: '本科一批', probability: 85 },
    { id: 2, school: '北京大学', major: '人工智能', batch: '本科一批', probability: 78 },
    { id: 3, school: '浙江大学', major: '软件工程', batch: '本科一批', probability: 75 },
    { id: 4, school: '复旦大学', major: '数据科学与大数据技术', batch: '本科一批', probability: 72 },
    { id: 5, school: '上海交通大学', major: '电子信息工程', batch: '本科一批', probability: 70 },
  ]);

  const addApplication = () => {
    const newId = applications.length > 0 ? Math.max(...applications.map(a => a.id)) + 1 : 1;
    setApplications([
      ...applications,
      { id: newId, school: '', major: '', batch: '本科一批', probability: 0 }
    ]);
  };

  const deleteApplication = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const updateApplication = (id: number, field: keyof Application, value: string | number) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const savePlan = () => {
    // Save the plan (in a real app, this would be an API call)
    console.log('Saving application plan:', applications);
    
    // Show success notification
    setShowSuccess(true);
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none"
          >
            <div className="mx-auto w-full max-w-md bg-green-50 dark:bg-green-900/30 rounded-lg p-4 shadow-lg border border-green-200 dark:border-green-800 pointer-events-auto">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    志愿方案保存成功！
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-green-50 dark:bg-green-900/30 p-1.5 text-green-500 hover:bg-green-100 dark:hover:bg-green-800/50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50 dark:focus:ring-offset-green-900/30"
                      onClick={() => setShowSuccess(false)}
                    >
                      <span className="sr-only">关闭</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Form Card */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-100 dark:border-blue-900/50 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ChartBarIcon className="h-6 w-6" />
                      志愿填报表
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      onClick={addApplication}
                      className="text-white/90 hover:bg-white/10 hover:text-white text-sm px-3 py-1.5"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      添加志愿
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHead className="bg-blue-50 dark:bg-gray-700/50">
                        <TableRow className="border-b border-blue-100 dark:border-gray-700">
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">序号</TableHeader>
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">院校</TableHeader>
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">专业</TableHeader>
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">批次</TableHeader>
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">录取概率</TableHeader>
                          <TableHeader className="text-blue-800 dark:text-blue-200 whitespace-nowrap">操作</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {applications.map((app, index) => (
                          <TableRow 
                            key={app.id} 
                            className="border-b border-blue-50 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-gray-700/30 transition-colors"
                          >
                            <TableCell className="font-medium text-blue-900 dark:text-blue-100">{index + 1}</TableCell>
                            <TableCell>
                              <input
                                type="text"
                                className="w-full bg-transparent border-b-2 border-blue-100 dark:border-blue-900 focus:border-blue-500 focus:ring-0 py-2 px-1 text-blue-900 dark:text-blue-100 placeholder-blue-300 dark:placeholder-blue-700"
                                value={app.school}
                                onChange={(e) => updateApplication(app.id, 'school', e.target.value)}
                                placeholder="输入院校名称"
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="text"
                                className="w-full bg-transparent border-b-2 border-blue-100 dark:border-blue-900 focus:border-blue-500 focus:ring-0 py-2 px-1 text-blue-900 dark:text-blue-100 placeholder-blue-300 dark:placeholder-blue-700"
                                value={app.major}
                                onChange={(e) => updateApplication(app.id, 'major', e.target.value)}
                                placeholder="输入专业名称"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="relative">
                                <select
                                  className="w-full bg-transparent border-b-2 border-blue-100 dark:border-blue-900 focus:border-blue-500 focus:ring-0 py-2 px-1 text-blue-900 dark:text-blue-100 appearance-none pr-8"
                                  value={app.batch}
                                  onChange={(e) => updateApplication(app.id, 'batch', e.target.value)}
                                >
                                  <option value="本科一批">本科一批</option>
                                  <option value="本科二批">本科二批</option>
                                  <option value="专科批">专科批</option>
                                </select>
                                <DropdownArrow />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                app.probability > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                app.probability > 50 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                              }`}>
                                {app.probability}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <button
                                onClick={() => deleteApplication(app.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                title="删除"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {applications.length === 0 && (
                    <div className="p-8 text-center text-blue-400 dark:text-blue-600">
                      <p className="mb-4">暂无志愿数据，请点击上方按钮添加</p>
                      <Button 
                        variant="outline"
                        onClick={addApplication}
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/30 text-sm px-3 py-1.5"
                      >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        添加第一个志愿
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex justify-end">
              <Button
                onClick={savePlan}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50"
              >
                <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                保存志愿方案
              </Button>
            </div>
          </div>

          {/* Sidebar - Chart Section */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-6 h-full"
            >
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg h-full flex flex-col">
                <CardHeader className="bg-blue-600 dark:bg-blue-700 text-white rounded-t-lg p-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <ArrowPathIcon className="h-5 w-5" />
                    录取概率分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex-1 min-h-[200px] w-full">
                    <AdmissionProbabilityChart applications={applications} />
                  </div>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
                    {applications.length > 0 ? (
                      <p>已添加 <span className="font-medium text-blue-600 dark:text-blue-400">{applications.length}</span> 个志愿，系统正在智能分析中...</p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">添加志愿后，系统将自动进行智能分析</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MockFillPage;
