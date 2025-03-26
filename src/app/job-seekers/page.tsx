'use client'

import { useState, useEffect } from 'react'
import { useJobSeekers } from '@/bounded-contexts/job-seeker-context/hooks/useJobSeekers'
import Link from 'next/link'

export default function JobSeekersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { jobSeekers, loading, error, searchJobSeekers } = useJobSeekers()
  
  const handleSearch = () => {
    searchJobSeekers(searchTerm)
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Seekers</h1>
      
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search job seekers by name, title, or skills..."
            className="flex-grow p-2 border border-gray-300 rounded-l"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded-r"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="mt-2">
          <Link href="/job-seekers/create" className="text-green-600 mr-4">
            Create Profile
          </Link>
          <button className="text-green-600">Advanced Search</button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobSeekers.length === 0 ? (
            <div className="text-center py-8 text-gray-500 md:col-span-2">
              No job seekers found. Try a different search term.
            </div>
          ) : (
            jobSeekers.map(seeker => (
              <div key={seeker.id} className="border border-gray-200 rounded p-4 hover:shadow-md">
                <div className="flex items-start">
                  {seeker.profilePictureUrl && (
                    <div className="mr-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        <img 
                          src={seeker.profilePictureUrl} 
                          alt={`${seeker.firstName} ${seeker.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{seeker.firstName} {seeker.lastName}</h2>
                    <p className="text-gray-600 mt-1">{seeker.title}</p>
                    <p className="text-gray-500 mt-1">
                      {seeker.experience && seeker.experience.length > 0 
                        ? `${seeker.experience.length} years experience` 
                        : 'No experience listed'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {seeker.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {seeker.skills.length > 5 && (
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        +{seeker.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Link 
                    href={`/job-seekers/${seeker.id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View Profile
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
