import React from 'react'

import OwnerAllShops from './components/OwnerAllShops'
import OwnerNavbar from './components/OwnerNavbar'

const OwnerDashboard = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <OwnerNavbar />

      <main className='w-full flex-1 mx-auto max-w-7xl  px-4 py-8 sm:py-10'>
          <OwnerAllShops/>
      </main>
     
    </div>
  )
}

export default OwnerDashboard
