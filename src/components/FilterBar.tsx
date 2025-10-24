import React, { useState } from 'react';
import { FilterOptions } from '../types/recommendation';
import { FiFilter, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const regions = ['全部', '北京', '上海', '广东', '江苏', '浙江', '四川', '湖北', '湖南', '其他'];
const schoolTypes = ['全部', '985', '211', '双一流', '一本', '二本', '专科'];
const majorCategories = ['全部', '理工类', '综合类', '财经类', '医药类', '师范类', '语言类', '政法类'];
const batches = ['全部', '本科一批', '本科二批', '专科批'];

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Remove scoreDifference from FilterOptions type since we're not using it
  type FilterBarOptions = Omit<FilterOptions, 'scoreDifference'>;
  
  const handleFilterChange = (key: keyof FilterBarOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilter(null); // Close dropdown after selection
  };

  const clearFilter = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Map the display key to the actual filter key
    const filterKeyMap: Record<string, keyof FilterBarOptions> = {
      '地区': 'region',
      '院校类型': 'schoolType',
      '专业类别': 'majorCategory',
      '批次': 'batch'
    };
    
    const filterKey = filterKeyMap[key] as keyof FilterOptions;
    if (!filterKey) return;
    
    const newFilters = { ...filters };
    delete newFilters[filterKey];
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderFilterButton = (
    label: string,
    value: string | undefined,
    isActive: boolean,
    onClick: () => void,
    hasValue: boolean
  ) => (
    <div className="relative min-w-[200px] flex-1 max-w-[200px]">
      <button
        type="button"
        onClick={onClick}
        className={`relative flex items-center justify-between w-full px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          isActive
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 pr-10'
            : hasValue
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 pr-10'
            : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 pr-8'
        } border ${
          isActive
            ? 'border-blue-300 dark:border-blue-700'
            : hasValue
            ? 'border-blue-200 dark:border-blue-800'
            : 'border-gray-200 dark:border-gray-600'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center min-w-0">
            <span className="truncate text-sm">{label}</span>
            {hasValue && value && !isActive && (
              <span className="ml-1.5 inline-flex items-center justify-center min-w-[28px] h-5 rounded-full bg-blue-100 text-blue-600 text-xs px-1.5 dark:bg-blue-800 dark:text-blue-200 flex-shrink-0">
                {value.length > 4 ? value.substring(0, 4) + (value.length > 4 ? '...' : '') : value}
              </span>
            )}
          </div>
          <FiChevronDown 
            className={`h-4 w-4 transition-transform flex-shrink-0 ${
              isActive ? 'transform rotate-180' : ''
            }`} 
          />
        </div>
      </button>
      {hasValue && !isActive && (
        <button
          onClick={(e) => clearFilter(label, e)}
          className="absolute -right-2 -top-2 bg-white dark:bg-gray-800 rounded-full p-0.5 border border-gray-200 dark:border-gray-600 shadow-sm text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label={`清除${label}`}
        >
          <FiX size={14} />
        </button>
      )}
    </div>
  );

  const renderDropdown = (
    options: string[],
    selectedValue: string | undefined,
    onSelect: (value: string) => void,
    isActive: boolean
  ) => {
    if (!isActive) return null;
    
    return (
      <div className="absolute z-10 mt-2 w-80 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
        <div className="py-1.5 max-h-72 overflow-auto" role="menu">
          {options.map((option) => (
            <button
              key={option}
              className={`block w-full text-left px-5 py-2.5 text-sm ${
                selectedValue === option || (option === '全部' && !selectedValue)
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/70 dark:text-blue-100 font-medium'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700/50'
              } transition-colors`}
              onClick={() => onSelect(option === '全部' ? '' : option)}
              role="menuitem"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };


  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="relative mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FiFilter className="mr-2" size={20} />
          筛选条件
        </h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setFilters({});
              onFilterChange({} as any);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center transition-colors"
          >
            <FiX className="mr-1" size={16} />
            清除所有筛选
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-20">
        {/* 地区筛选 */}
        <div className="relative w-full">
          {renderFilterButton(
            '地区',
            filters.region || '',
            activeFilter === 'region',
            () => setActiveFilter(activeFilter === 'region' ? null : 'region'),
            !!filters.region
          )}
          {renderDropdown(
            regions,
            filters.region,
            (value) => handleFilterChange('region', value || undefined),
            activeFilter === 'region'
          )}
        </div>

        {/* 院校类型 */}
        <div className="relative w-full">
          {renderFilterButton(
            '院校类型',
            filters.schoolType || '',
            activeFilter === 'schoolType',
            () => setActiveFilter(activeFilter === 'schoolType' ? null : 'schoolType'),
            !!filters.schoolType
          )}
          {renderDropdown(
            schoolTypes,
            filters.schoolType,
            (value) => handleFilterChange('schoolType', value || undefined),
            activeFilter === 'schoolType'
          )}
        </div>

        {/* 专业类别 */}
        <div className="relative w-full">
          {renderFilterButton(
            '专业类别',
            filters.majorCategory || '',
            activeFilter === 'majorCategory',
            () => setActiveFilter(activeFilter === 'majorCategory' ? null : 'majorCategory'),
            !!filters.majorCategory
          )}
          {renderDropdown(
            majorCategories,
            filters.majorCategory,
            (value) => handleFilterChange('majorCategory', value || undefined),
            activeFilter === 'majorCategory'
          )}
        </div>

        {/* 批次 */}
        <div className="relative w-full">
          {renderFilterButton(
            '批次',
            filters.batch || '',
            activeFilter === 'batch',
            () => setActiveFilter(activeFilter === 'batch' ? null : 'batch'),
            !!filters.batch
          )}
          {renderDropdown(
            batches,
            filters.batch,
            (value) => handleFilterChange('batch', value || undefined),
            activeFilter === 'batch'
          )}
        </div>

      </div>

      {/* Click outside to close dropdowns */}
      {activeFilter && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setActiveFilter(null)}
        />
      )}
    </div>
  );
};

export default FilterBar;
