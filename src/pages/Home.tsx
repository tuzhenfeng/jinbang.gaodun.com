
import React, { useState } from 'react'
import { Select, InputNumber, Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Home(){
  const [province,setProvince] = useState('北京')
  const [score,setScore] = useState<number | null>(620)
  const nav = useNavigate()

  return (
    <div>
      <div className="text-3xl font-bold mb-4 text-[var(--color-primary)]">高考志愿智能填报系统</div>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 p-6 bg-gray-50 rounded-lg">
          <div className="text-lg font-medium mb-3">快速生成推荐方案</div>
          <Space>
            <Select value={province} onChange={(v)=>setProvince(v)} style={{width:160}}>
              <Select.Option value="北京">北京</Select.Option>
              <Select.Option value="江苏">江苏</Select.Option>
              <Select.Option value="浙江">浙江</Select.Option>
            </Select>
            <InputNumber min={300} max={750} value={score!} onChange={(v)=>setScore(v)} />
            <Button type="primary" onClick={()=>nav('/recommend')}>生成推荐方案</Button>
          </Space>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="font-medium mb-2">功能快捷</div>
          <div className="flex flex-col gap-3">
            <Button onClick={()=>nav('/mock-fill')}>模拟填报</Button>
            <Button>专业测评</Button>
            <Button>院校库查询</Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xl font-semibold mb-3">推荐功能</div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-white shadow-sm">智能推荐</div>
          <div className="p-6 rounded-lg bg-white shadow-sm">模拟填报</div>
          <div className="p-6 rounded-lg bg-white shadow-sm">专业测评</div>
        </div>
      </div>
    </div>
  )
}
