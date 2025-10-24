import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colleges, College } from '../data/mockData';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon
} from '@heroicons/react/24/outline';
import CollegeCard from '../components/CollegeCard';

interface FilterOptions {
  province: string;
  tier: string;
  tag: string;
  searchQuery: string;
}

const CollegesPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteColleges');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [planColleges, setPlanColleges] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('planColleges');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [filters, setFilters] = useState<FilterOptions>({
    province: '',
    tier: '',
    tag: '',
    searchQuery: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get unique filter options
  const provinces = Array.from(new Set(colleges.map(c => c.province)));
  const tiers = Array.from(new Set(colleges.map(c => c.tier)));
  const allTags = Array.from(new Set(colleges.flatMap(c => c.tags)));

  // Save state to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favoriteColleges', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('planColleges', JSON.stringify(planColleges));
  }, [planColleges]);

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    setFavorites(prev => 
      isFavorite 
        ? [...prev, id]
        : prev.filter(favId => favId !== id)
    );
  };

  const handlePlanToggle = (id: string, isInPlan: boolean) => {
    setPlanColleges(prev => 
      isInPlan
        ? [...prev, id]
        : prev.filter(planId => planId !== id)
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      province: '',
      tier: '',
      tag: '',
      searchQuery: ''
    });
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                       college.province.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesProvince = !filters.province || college.province === filters.province;
    const matchesTier = !filters.tier || college.tier === filters.tier;
    const matchesTag = !filters.tag || college.tags.includes(filters.tag);
    
    return matchesSearch && matchesProvince && matchesTier && matchesTag;
  });

  const navigateToDetail = (id: string) => {
    navigate(`/colleges/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">院校库</h1>
          <p className="text-gray-600 dark:text-gray-400">
            共找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredColleges.length}</span> 所院校
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement add all to plan functionality
              alert('请先选择要添加的院校');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
          >
            加入志愿
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              placeholder="搜索院校名称或地区..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label="筛选"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  省份/地区
                </label>
                <select
                  id="province"
                  name="province"
                  value={filters.province}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">全部</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  院校层次
                </label>
                <select
                  id="tier"
                  name="tier"
                  value={filters.tier}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">全部</option>
                  {tiers.map(tier => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  院校类型
                </label>
                <select
                  id="tag"
                  name="tag"
                  value={filters.tag}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">全部</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end space-x-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  重置筛选
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* College List */}
      <div className="space-y-4">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <CollegeCard
              key={college.id}
              college={college}
              isFavorite={favorites.includes(college.id)}
              isInPlan={planColleges.includes(college.id)}
              onFavoriteToggle={handleFavoriteToggle}
              onPlanToggle={handlePlanToggle}
              probability={0.7}
            />
          ))
        ) : (
          <div className="p-8 text-center bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">没有找到符合条件的院校，请尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesPage;
