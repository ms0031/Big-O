"use client"
import FeaturesSectionDemo from '@/components/features-section-demo-2'
import React from 'react'
import { NavbarDemo } from '../components/Navbar'

function Page() {
  return (
    <main className="bg-red-50 p-6">
      <NavbarDemo />
      <div className="mt-22"></div>
      <FeaturesSectionDemo />
    </main>
  )
}

export default Page