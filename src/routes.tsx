
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recommendation from './pages/Recommendation'
import CollegeDetail from './pages/CollegeDetail'
import MockFill from './pages/MockFill'

export default function RoutesMap(){
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/recommend' element={<Recommendation/>} />
      <Route path='/college/:id' element={<CollegeDetail/>} />
      <Route path='/mock-fill' element={<MockFill/>} />
    </Routes>
  )
}
