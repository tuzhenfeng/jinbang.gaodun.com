
import React from 'react'
import { Card, Progress, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { College } from '../data/mockData'

export default function CollegeCard({college, probability=0.6}:{college: College, probability?: number}){
  const nav = useNavigate()
  return (
    <Card className="mb-4" size="small">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">{college.name}</div>
          <div className="text-sm text-gray-500">{college.province} · {college.tier} · 招生{college.enroll}人</div>
        </div>
        <div className="w-64">
          <div className="text-sm">录取概率</div>
          <Progress percent={Math.round(probability*100)} size="small" strokeColor="var(--color-primary)"/>
        </div>
        <div className="flex flex-col gap-2">
          <Button type="primary" onClick={()=>nav(`/college/${college.id}`)}>查看</Button>
          <Button onClick={()=>alert('已加入志愿表')}>加入志愿</Button>
        </div>
      </div>
    </Card>
  )
}
