
import React, {useState} from 'react'
import { Table, Button } from 'antd'

export default function MockFill(){
  const [data,setData] = useState([
    { key:1, order:1, college: '青春大学', major:'计算机' },
    { key:2, order:2, college: '希望理工学院', major:'电子信息' }
  ])

  const columns = [
    { title:'序号', dataIndex:'order', key:'order' },
    { title:'院校', dataIndex:'college', key:'college' },
    { title:'专业', dataIndex:'major', key:'major' },
    { title:'操作', key:'op', render: (_:any,row:any)=> <Button danger onClick={()=>setData((d:any)=>d.filter((i:any)=>i.key!==row.key))}>删除</Button> }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">志愿模拟填报</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="mt-4 flex gap-3">
        <Button type="primary">保存方案</Button>
        <Button>导出PDF</Button>
      </div>
    </div>
  )
}
