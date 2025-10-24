
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import Header from './components/Header';
import './index.css';
import 'antd/dist/reset.css';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const CollegeDetail = React.lazy(() => import('./pages/CollegeDetail'));
const RecommendPage = React.lazy(() => import('./pages/RecommendPage'));
const MockFillPage = React.lazy(() => import('./pages/MockFillPage'));
const CollegesPage = React.lazy(() => import('./pages/CollegesPage'));
const MajorsPage = React.lazy(() => import('./pages/MajorsPage'));
const AssessmentRecommendations = React.lazy(() => import('./pages/AssessmentRecommendations'));

// Add global styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float 8s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient 10s ease infinite;
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
`;
document.head.appendChild(style);

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spin size="large" />
  </div>
);

// Main App component with routing
const App = () => (
  <ThemeProvider>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0084FF', // 主色 - 蓝色
          colorInfo: '#0084FF',
          colorSuccess: '#52C41A', // 成功 - 绿色
          colorWarning: '#FF5C00', // 警告 - 使用辅助色橙色
          colorError: '#F5222D',   // 错误 - 标准红
          colorLink: '#0084FF',    // 链接色与主色一致
          borderRadius: 8,
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Router>
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/colleges/:id" element={<CollegeDetail />} />
                <Route path="/recommend" element={<RecommendPage />} />
                <Route path="/mock-fill" element={<MockFillPage />} />
                <Route path="/colleges" element={<CollegesPage />} />
                <Route path="/majors" element={<MajorsPage />} />
                <Route path="/assessment-recommendations" element={<AssessmentRecommendations />} />
                {/* Add more routes here as needed */}
              </Routes>
            </Suspense>
          </main>
          
          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} 高考志愿智能系统. 保留所有权利。
                </div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="/about" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    关于我们
                  </a>
                  <a href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    服务条款
                  </a>
                  <a href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    隐私政策
                  </a>
                  <a href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    联系我们
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ConfigProvider>
  </ThemeProvider>
);

// Render the application
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
