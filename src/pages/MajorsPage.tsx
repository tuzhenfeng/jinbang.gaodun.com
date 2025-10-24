import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

type Question = {
  id: number;
  text: string;
  category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
};

type Result = {
  type: string;
  score: number;
  description: string;
  recommendedMajors: string[];
  careerPaths: string[];
};

const questions: Question[] = [
  { id: 1, text: '我喜欢动手修理或制作物品', category: 'R' },
  { id: 2, text: '我喜欢研究事物的工作原理', category: 'I' },
  { id: 3, text: '我擅长音乐、艺术或戏剧', category: 'A' },
  { id: 4, text: '我喜欢帮助他人解决问题', category: 'S' },
  { id: 5, text: '我喜欢领导和影响他人', category: 'E' },
  { id: 6, text: '我喜欢处理数据和文书工作', category: 'C' },
  { id: 7, text: '我喜欢户外活动或体力劳动', category: 'R' },
  { id: 8, text: '我喜欢进行科学实验', category: 'I' },
  { id: 9, text: '我有丰富的想象力', category: 'A' },
  { id: 10, text: '我善于倾听和理解他人', category: 'S' },
];

const categoryInfo = {
  R: { name: '现实型', color: 'bg-blue-500' },
  I: { name: '研究型', color: 'bg-green-500' },
  A: { name: '艺术型', color: 'bg-yellow-500' },
  S: { name: '社会型', color: 'bg-purple-500' },
  E: { name: '企业型', color: 'bg-red-500' },
  C: { name: '常规型', color: 'bg-indigo-500' },
};

const results: Record<string, Result> = {
  R: {
    type: '现实型',
    score: 0,
    description: '喜欢与物体、工具、机器、动物等具体事物打交道，偏好需要动手操作的工作。',
    recommendedMajors: ['机械工程', '计算机科学', '土木工程', '电子工程'],
    careerPaths: ['工程师', '技术人员', '建筑师', '机械师']
  },
  I: {
    type: '研究型',
    score: 0,
    description: '喜欢观察、学习、分析、评估和解决问题，偏好需要思考的工作。',
    recommendedMajors: ['物理学', '生物学', '化学', '数学'],
    careerPaths: ['科学家', '研究员', '大学教授', '数据分析师']
  },
  A: {
    type: '艺术型',
    score: 0,
    description: '喜欢创造性的工作，偏好需要想象力和表现力的活动。',
    recommendedMajors: ['视觉艺术', '音乐', '戏剧', '创意写作'],
    careerPaths: ['艺术家', '音乐家', '设计师', '作家']
  },
  S: {
    type: '社会型',
    score: 0,
    description: '喜欢帮助、教导或服务他人，偏好与人交往的工作。',
    recommendedMajors: ['心理学', '教育学', '社会工作', '护理学'],
    careerPaths: ['教师', '心理咨询师', '社会工作者', '护士']
  },
  E: {
    type: '企业型',
    score: 0,
    description: '喜欢领导和影响他人，偏好需要说服、管理或领导能力的工作。',
    recommendedMajors: ['工商管理', '市场营销', '金融', '政治学'],
    careerPaths: ['企业家', '经理', '销售主管', '政治家']
  },
  C: {
    type: '常规型',
    score: 0,
    description: '喜欢有组织和有条理的工作，偏好需要精确性和注意细节的任务。',
    recommendedMajors: ['会计', '金融', '行政管理', '图书馆学'],
    careerPaths: ['会计师', '行政助理', '银行职员', '数据分析师']
  }
};

const MajorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [assessmentResults, setAssessmentResults] = useState<Result[]>([]);

  const handleStartAssessment = () => {
    setCurrentStep('quiz');
  };

  const handleAnswer = (score: number) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
      setCurrentStep('result');
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {
      R: 0, I: 0, A: 0, S: 0, E: 0, C: 0
    };

    // Calculate scores for each category
    Object.entries(answers).forEach(([questionId, score]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        scores[question.category] += score;
      }
    });

    // Update results with scores
    const updatedResults = Object.entries(scores).map(([type, score]) => ({
      ...results[type as keyof typeof results],
      score
    }));

    // Sort by score in descending order
    updatedResults.sort((a, b) => b.score - a.score);
    setAssessmentResults(updatedResults);
  };

  const restartAssessment = () => {
    setCurrentStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const data = {
    labels: assessmentResults.map(r => r.type),
    datasets: [
      {
        data: assessmentResults.map(r => r.score),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          专业兴趣测评
        </h1>

        {currentStep === 'intro' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              发现你的专业兴趣
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-left">
              本测评基于霍兰德职业兴趣理论，通过10个问题帮助你了解自己的职业兴趣类型，
              并为你推荐适合的专业方向和职业发展建议。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {Object.entries(categoryInfo).map(([key, { name, color }]) => (
                <div key={key} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className={`w-3 h-3 ${color} rounded-full mb-2 mx-auto`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
                </div>
              ))}
            </div>
            <Button 
              onClick={handleStartAssessment}
              className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              开始测评
            </Button>
          </div>
        )}

        {currentStep === 'quiz' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-right">
                问题 {currentQuestion + 1}/{questions.length}
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
              {questions[currentQuestion].text}
            </h3>
            
            <div className="space-y-4 mt-8">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  onClick={() => handleAnswer(score)}
                  className="w-full px-6 py-3 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      {score === 1 && '非常不同意'}
                      {score === 2 && '不同意'}
                      {score === 3 && '一般'}
                      {score === 4 && '同意'}
                      {score === 5 && '非常同意'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{score}分</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'result' && assessmentResults.length > 0 && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                你的兴趣类型分析
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="h-64 flex items-center justify-center">
                    <Doughnut 
                      data={data} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              color: '#6B7280',
                              font: {
                                size: 14
                              },
                              padding: 20
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    你的主要兴趣类型: {assessmentResults[0].type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {assessmentResults[0].description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">推荐专业:</h4>
                      <div className="flex flex-wrap gap-2">
                        {assessmentResults[0].recommendedMajors.map((major, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full dark:bg-blue-900 dark:text-blue-200"
                          >
                            {major}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">适合职业:</h4>
                      <div className="flex flex-wrap gap-2">
                        {assessmentResults[0].careerPaths.map((career, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full dark:bg-green-900 dark:text-green-200"
                          >
                            {career}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                详细分析
              </h3>
              <div className="space-y-6">
                {assessmentResults.map((result, index) => (
                  <div key={result.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {result.type}型
                      </span>
                      <div className="flex items-center">
                        <div className="w-48 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                          <div 
                            className="h-2.5 rounded-full" 
                            style={{
                              width: `${(result.score / 20) * 100}%`,
                              backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)',
                                'rgba(139, 92, 246, 0.8)',
                                'rgba(239, 68, 68, 0.8)',
                                'rgba(99, 102, 241, 0.8)'
                              ][index]
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                          {result.score}分
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={restartAssessment}
                variant="outline"
                className="px-6 py-3"
              >
                重新测评
              </Button>
              <Button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  navigate('/assessment-recommendations', { 
                    state: { assessmentResults } 
                  });
                }}
              >
                根据测评结果推荐志愿
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MajorsPage;
