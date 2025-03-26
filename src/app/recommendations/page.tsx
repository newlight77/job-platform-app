'use client'

import { useState, useEffect } from 'react'
import { useRecommendations } from '@/bounded-contexts/recommendation-context/hooks/useRecommendations'
import { useJobSeekers } from '@/bounded-contexts/job-seeker-context/hooks/useJobSeekers'
import { JobRecommendation } from '@/bounded-contexts/recommendation-context/domain/types'
import Link from 'next/link'

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedSeekerId, setSelectedSeekerId] = useState<string>('1') // Default to first seeker for demo
  
  const { getRecommendationsForSeeker, generateRecommendationsForSeeker, updateRecommendationStatus } = useRecommendations()
  const { jobSeekers } = useJobSeekers()
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const recs = await getRecommendationsForSeeker(selectedSeekerId)
        setRecommendations(recs)
        setError(null)
      } catch (err) {
        setError('Failed to fetch recommendations')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    if (selectedSeekerId) {
      fetchRecommendations()
    }
  }, [selectedSeekerId, getRecommendationsForSeeker])
  
  const handleRefreshRecommendations = async () => {
    try {
      setRefreshing(true)
      const recs = await generateRecommendationsForSeeker(selectedSeekerId)
      setRecommendations(recs)
      setError(null)
    } catch (err) {
      setError('Failed to refresh recommendations')
      console.error(err)
    } finally {
      setRefreshing(false)
    }
  }
  
  const handleUpdateStatus = async (id: string, status: JobRecommendation['status']) => {
    try {
      const updated = await updateRecommendationStatus(id, status)
      if (updated) {
        setRecommendations(prev => 
          prev.map(rec => rec.id === id ? updated : rec)
        )
      }
    } catch (err) {
      setError('Failed to update recommendation status')
      console.error(err)
    }
  }
  
  const handleSeekerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeekerId(e.target.value)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Recommendations</h1>
      
      <div className="mb-6 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <label htmlFor="seeker-select" className="block text-gray-700 font-medium mb-2">
              Select Job Seeker:
            </label>
            <select
              id="seeker-select"
              className="p-2 border border-gray-300 rounded w-full md:w-auto"
              value={selectedSeekerId}
              onChange={handleSeekerChange}
            >
              {jobSeekers.map(seeker => (
                <option key={seeker.id} value={seeker.id}>
                  {seeker.firstName} {seeker.lastName} - {seeker.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded flex items-center"
              onClick={handleRefreshRecommendations}
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Recommendations
                </>
              )}
            </button>
            
            <Link 
              href={`/recommendations/preferences/${selectedSeekerId}`}
              className="ml-2 text-purple-600 hover:underline"
            >
              Preferences
            </Link>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No job recommendations found.</p>
              <button
                className="mt-4 text-purple-600 hover:underline"
                onClick={handleRefreshRecommendations}
              >
                Generate Recommendations
              </button>
            </div>
          ) : (
            recommendations.map(recommendation => (
              <div 
                key={recommendation.id} 
                className={`border rounded-lg overflow-hidden shadow-md ${
                  recommendation.status === 'NEW' ? 'border-purple-300 bg-purple-50' :
                  recommendation.status === 'VIEWED' ? 'border-gray-300 bg-white' :
                  recommendation.status === 'SAVED' ? 'border-green-300 bg-green-50' :
                  recommendation.status === 'APPLIED' ? 'border-blue-300 bg-blue-50' :
                  'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-semibold">
                          <Link href={`/job-offers/${recommendation.jobOfferId}`} className="hover:text-purple-600">
                            {/* In a real app, we would fetch the job title */}
                            Job Offer #{recommendation.jobOfferId}
                          </Link>
                        </h2>
                        <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                          recommendation.matchScore >= 80 ? 'bg-green-100 text-green-800' :
                          recommendation.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {recommendation.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">
                        {/* In a real app, we would fetch the company and location */}
                        Company • Location
                      </p>
                    </div>
                    
                    <div className="flex">
                      <button
                        className={`px-3 py-1 rounded-l border ${
                          recommendation.status === 'SAVED' 
                            ? 'bg-green-600 text-white border-green-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => handleUpdateStatus(recommendation.id, 'SAVED')}
                        title="Save"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      
                      <button
                        className={`px-3 py-1 border-t border-b ${
                          recommendation.status === 'DISMISSED' 
                            ? 'bg-red-600 text-white border-red-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => handleUpdateStatus(recommendation.id, 'DISMISSED')}
                        title="Dismiss"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      <Link
                        href={`/job-offers/${recommendation.jobOfferId}/apply`}
                        className={`px-3 py-1 rounded-r border ${
                          recommendation.status === 'APPLIED' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        title="Apply"
                        onClick={() => handleUpdateStatus(recommendation.id, 'APPLIED')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Why this matches your profile:</h3>
                    <div className="space-y-2">
                      {recommendation.matchReasons.map((reason, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-12 h-2 rounded-full mr-3 ${
                            reason.score >= 80 ? 'bg-green-500' :
                            reason.score >= 60 ? 'bg-yellow-500' :
                            reason.score >= 40 ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <span className="font-medium">{reason.type.charAt(0) + reason.type.slice(1).toLowerCase().replace('_', ' ')}:</span>
                            <span className="ml-1 text-gray-700">{reason.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link 
                      href={`/job-offers/${recommendation.jobOfferId}`}
                      className="text-purple-600 hover:underline"
                    >
                      View Job Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
