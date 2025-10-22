
import React from 'react'
import { useParams } from 'react-router-dom'
import { colleges } from '../data/mockData'
import ReactECharts from 'echarts-for-react'

export default function CollegeDetail(){
  const { id } = useParams()
  const college = colleges.find(c=>c.id===id) || colleges[0]

  const option = {
    xAxis: { type: 'category', data: ['2023','2022','2021'] },
    yAxis: { type: 'value' },
    series: [{ type:'line', data: college.scoreLine }]
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{college.name}</h1>
          <div className="text-sm text-gray-500">{college.province} · {college.tier}</div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">近年分数线</h3>
          <ReactECharts option={option} style={{height:280}}/>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">专业推荐</h3>
          <div className="space-y-3">
            <div className="p-3 border rounded">计算机科学（近年分数：620）</div>
            <div className="p-3 border rounded">电子信息工程（近年分数：610）</div>
          </div>
        </div>
      </div>
    </div>
  )
}
