
import React, { useState } from 'react';
import { Card, Progress, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HeartFilled, HeartOutlined, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import type { College } from '../data/mockData';

interface CollegeCardProps {
  college: College;
  probability?: number;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
  onPlanToggle?: (id: string, isInPlan: boolean) => void;
  isFavorite?: boolean;
  isInPlan?: boolean;
}

export default function CollegeCard({ 
  college, 
  probability = 0.6,
  onFavoriteToggle,
  onPlanToggle,
  isFavorite: propIsFavorite,
  isInPlan: propIsInPlan
}: CollegeCardProps) {
  const nav = useNavigate();
  const [isFavorite, setIsFavorite] = useState(propIsFavorite || false);
  const [isInPlan, setIsInPlan] = useState(propIsInPlan || false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onFavoriteToggle) {
      onFavoriteToggle(college.id, newFavoriteState);
    }
  };

  const handlePlanClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newPlanState = !isInPlan;
    setIsInPlan(newPlanState);
    if (onPlanToggle) {
      onPlanToggle(college.id, newPlanState);
    }
  };
  return (
    <Card className="mb-4" size="small">
      <div className="flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold truncate">{college.name}</div>
            <button 
              onClick={handleFavoriteClick}
              className="text-lg text-gray-400 hover:text-red-500 transition-colors"
              aria-label={isFavorite ? '取消收藏' : '收藏'}
            >
              {isFavorite ? 
                <HeartFilled className="text-red-500" /> : 
                <HeartOutlined />
              }
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {college.province} · {college.tier} · 招生{college.enroll}人
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {college.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="w-48 px-4">
          <div className="text-sm text-gray-600 mb-1">录取概率</div>
          <Progress 
            percent={Math.round(probability * 100)} 
            size="small" 
            strokeColor="#1890ff"
            format={percent => `${percent}%`}
          />
        </div>
        <div className="flex flex-col gap-2 w-28">
          <Button 
            type="primary" 
            onClick={() => nav(`/colleges/${college.id}`)}
            className="flex items-center justify-center"
          >
            查看详情
          </Button>
          <Button 
            type={isInPlan ? 'default' : 'primary'} 
            onClick={handlePlanClick}
            className="flex items-center justify-center gap-1"
            icon={isInPlan ? <PlusCircleFilled /> : <PlusCircleOutlined />}
          >
            {isInPlan ? '已添加' : '加入志愿'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
