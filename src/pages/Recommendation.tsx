
import React from 'react'
import CollegeCard from '../components/CollegeCard'
import { colleges } from '../data/mockData'
import ReactECharts from 'echarts-for-react'

export default function Recommendation(){
  const chong = colleges.slice(0,1)
  const wen = colleges.slice(1,2)
  const bao = colleges.slice(2)

  const option = {
    tooltip: {},
    xAxis: { type: 'category', data: colleges.map(c=>c.name) },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [85, 65, 40] }]
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">推荐志愿方案</h2>
        <section className="mb-4">
          <h3 className="font-medium mb-2">冲（High Reach）</h3>
          {chong.map(c=> <CollegeCard key={c.id} college={c} probability={0.85} />)}
        </section>
        <section className="mb-4">
          <h3 className="font-medium mb-2">稳（Match）</h3>
          {wen.map(c=> <CollegeCard key={c.id} college={c} probability={0.65} />)}
        </section>
        <section className="mb-4">
          <h3 className="font-medium mb-2">保（Safe）</h3>
          {bao.map(c=> <CollegeCard key={c.id} college={c} probability={0.4} />)}
        </section>
      </div>
      <aside style={{width:360}}>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-2">录取概率总览</div>
          <ReactECharts option={option} style={{height:240}}/>
        </div>
      </aside>
    </div>
  )
}
