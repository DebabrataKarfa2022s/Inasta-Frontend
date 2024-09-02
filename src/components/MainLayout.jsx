import React from 'react'
import LeftSlidebar from './LeftSlidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <LeftSlidebar/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout
