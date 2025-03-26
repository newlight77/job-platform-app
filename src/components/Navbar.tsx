'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 text-2xl font-bold text-blue-600">
              JobMatch
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/job-offers" className="px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
                Job Offers
              </Link>
              <Link href="/job-seekers" className="px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">
                Job Seekers
              </Link>
              <Link href="/recommendations" className="px-3 py-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-gray-100">
                Recommendations
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link href="/job-offers/create" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium mr-2 hover:bg-blue-700">
                Post a Job
              </Link>
              <Link href="/job-seekers/create" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                Create Profile
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/job-offers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100">
            Job Offers
          </Link>
          <Link href="/job-seekers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100">
            Job Seekers
          </Link>
          <Link href="/recommendations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-100">
            Recommendations
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-5">
            <Link href="/job-offers/create" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md text-base font-medium mb-2 hover:bg-blue-700">
              Post a Job
            </Link>
          </div>
          <div className="flex items-center px-5">
            <Link href="/job-seekers/create" className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-green-700">
              Create Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
