
import React from 'react'
import { Layout } from 'antd'
import AppHeader from './components/Header'
import RoutesMap from './routes'

const { Content, Footer } = Layout

export default function App(){
  return (
    <Layout style={{minHeight: '100vh'}}>
      <AppHeader />
      <Content className="p-6">
        <div className="app-shell">
          <RoutesMap />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>高考志愿智能填报系统 © 2025</Footer>
    </Layout>
  )
}
