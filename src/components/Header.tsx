
import React from 'react';
import { Input } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AnimatedButton from './ui/AnimatedButton';
import { useTheme } from '../theme/ThemeProvider';
import classNames from 'classnames';

// Navigation items with their paths and display names
const navItems = [
  { path: '/', name: '首页' },
  { path: '/recommend', name: '智能推荐' },
  { path: '/mock-fill', name: '模拟填报' },
  { path: '/colleges', name: '院校库' },
  { path: '/majors', name: '专业库' },
];

export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              高考志愿智能系统
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={classNames(
                    'px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200',
                    {
                      ' text-primary-700  dark:text-primary-300': isActive(item.path),
                      'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50': !isActive(item.path)
                    }
                  )}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute inset-x-1 -bottom-px h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Input.Search 
                placeholder="搜索院校/专业" 
                onSearch={(value) => value && navigate(`/search?q=${value}`)}
                className="w-64"
                allowClear
              />
            </div>
            
            <AnimatedButton 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
              className="hidden md:flex"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </AnimatedButton>
            
            <div className="hidden md:flex items-center space-x-2">
              <AnimatedButton 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
              >
                登录
              </AnimatedButton>
              <AnimatedButton 
                size="sm" 
                onClick={() => navigate('/register')}
              >
                注册
              </AnimatedButton>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded="false"
              >
                <span className="sr-only">打开主菜单</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={classNames(
                'block px-3 py-2 text-base font-medium',
                {
                  'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300': isActive(item.path),
                  'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700': !isActive(item.path)
                }
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-3 py-2">
            <AnimatedButton 
              variant="outline" 
              size="sm" 
              className="w-full justify-center mb-2"
              onClick={() => navigate('/login')}
            >
              登录
            </AnimatedButton>
            <AnimatedButton 
              size="sm" 
              className="w-full justify-center"
              onClick={() => navigate('/register')}
            >
              注册
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  );
}
