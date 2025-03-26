'use client'

import { useState, useEffect } from 'react'
import { useJobOffers } from '@/bounded-contexts/job-offering-context/hooks/useJobOffers'
import Link from 'next/link'

export default function JobOffersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { jobOffers, loading, error, searchJobOffers } = useJobOffers()
  
  const handleSearch = () => {
    searchJobOffers(searchTerm)
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Offers</h1>
      
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search job offers..."
            className="flex-grow p-2 border border-gray-300 rounded-l"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-r"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="mt-2">
          <Link href="/job-offers/create" className="text-blue-600 mr-4">
            Post a Job Offer
          </Link>
          <button className="text-blue-600">Advanced Search</button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobOffers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No job offers found. Try a different search term.
            </div>
          ) : (
            jobOffers.map(job => (
              <div key={job.id} className="border border-gray-200 rounded p-4 hover:shadow-md">
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-600">{job.company}</span>
                  <span className="text-gray-600">{job.location}</span>
                </div>
                <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p>
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{job.requirements.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                  <Link 
                    href={`/job-offers/${job.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
