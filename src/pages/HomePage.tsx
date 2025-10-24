import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Select, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '../components/ui/AnimatedButton';
import EducationIllustration from '../components/illustrations/EducationIllustration';

// Mock provinces data
const provinces = [
  '北京', '上海', '广东', '江苏', '浙江', '四川', '湖北', '湖南',
  '河南', '山东', '河北', '陕西', '福建', '安徽', '辽宁', '江西',
  '重庆', '黑龙江', '广西', '山西', '云南', '吉林', '贵州', '甘肃',
  '海南', '青海', '宁夏', '西藏', '新疆', '内蒙古', '天津'
];

const subjects = [
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' },
  { value: 'biology', label: '生物' },
  { value: 'politics', label: '政治' },
  { value: 'history', label: '历史' },
  { value: 'geography', label: '地理' },
  { value: 'technology', label: '技术' },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [score, setScore] = useState<string>('');
  const [percentile, setPercentile] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleGenerate = () => {
    if (!selectedProvince || !score || selectedSubjects.length !== 3) {
      return;
    }
    navigate('/recommend', { 
      state: { 
        province: selectedProvince,
        score: score,
        percentile: percentile,
        subjects: selectedSubjects
      }
    });
  };
  
  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else if (prev.length < 3) {
        return [...prev, subject];
      }
      return prev;
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedProvince && score && selectedSubjects.length === 3) {
      navigate('/recommend', { 
        state: { 
          province: selectedProvince,
          score: score,
          percentile: percentile,
          subjects: selectedSubjects
        }
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div 
            className="flex flex-col md:flex-row items-center"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.div 
              className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10"
              variants={item}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                高考志愿智能
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  填报系统
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                基于大数据分析，为您提供精准的高考志愿填报建议，助您圆梦理想大学。
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AnimatedButton 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={showModal}
                >
                  开始使用
                </AnimatedButton>
                <a href="/about">
                  <AnimatedButton 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto"
                  >
                    了解更多
                  </AnimatedButton>
                </a>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">
                    ✓
                  </div>
                  智能推荐
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">
                    ✓
                  </div>
                  数据精准
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 mr-2">
                    ✓
                  </div>
                  使用便捷
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-200 dark:bg-secondary-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="relative">
                  <EducationIllustration className="w-full h-auto max-w-md mx-auto" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              核心功能
            </motion.h2>
            <motion.p 
              className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              我们提供全方位的志愿填报解决方案，助您轻松应对高考志愿填报
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: '智能推荐',
                description: '基于历年分数线和位次，智能推荐适合您的院校和专业',
                icon: '🎯',
              },
              {
                title: '数据精准',
                description: '整合全国高校最新招生数据，确保信息准确可靠',
                icon: '📊',
              },
              {
                title: '职业规划',
                description: '结合职业发展趋势，为您提供专业的职业规划建议',
                icon: '🎓',
              },
              {
                title: '模拟填报',
                description: '提前模拟志愿填报，熟悉流程，避免失误',
                icon: '📝',
              },
              {
                title: '院校对比',
                description: '多维度对比不同院校，助您做出最佳选择',
                icon: '⚖️',
              },
              {
                title: '专业解析',
                description: '详细解析各专业课程设置、就业前景等信息',
                icon: '🔍',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            立即开始您的高考志愿填报之旅
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            加入数万考生共同选择的智能志愿填报平台，让您的高考志愿填报更轻松、更科学、更精准。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatedButton 
              size="lg" 
              className="bg-primary-200 text-white hover:bg-primary-700"
            >
              免费注册
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* Recommendation Modal */}
      <Modal 
        title="智能推荐大学" 
        open={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="开始智能推荐"
        cancelText="取消"
        okButtonProps={{
          icon: <SearchOutlined />,
          disabled: !selectedProvince || !score || !percentile || selectedSubjects.length !== 3,
          className: 'bg-blue-600 hover:bg-blue-700 border-none'
        }}
        width={600}
      >
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择省份
            </label>
            <Select
              placeholder="请选择省份"
              className="w-full"
              size="large"
              value={selectedProvince || undefined}
              onChange={setSelectedProvince}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={provinces.map(province => ({
                value: province,
                label: province
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选科（7选3）
              <span className="ml-1 text-xs text-gray-500">
                {selectedSubjects.length}/3
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.value}
                  type="button"
                  onClick={() => toggleSubject(subject.value)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors duration-200 ${
                    selectedSubjects.includes(subject.value)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                  disabled={!selectedSubjects.includes(subject.value) && selectedSubjects.length >= 3}
                >
                  {subject.label}
                </button>
              ))}
            </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                高考分数 <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                placeholder="请输入高考分数"
                size="large"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                位次 <span className="text-red-500">*</span>
                <span className="ml-1 text-xs text-gray-500">(全省排名)</span>
              </label>
              <Input
                type="number"
                placeholder="请输入位次"
                size="large"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
