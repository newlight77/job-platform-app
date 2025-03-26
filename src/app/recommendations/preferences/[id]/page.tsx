'use client'

import { useState, useEffect } from 'react'
import { useRecommendations } from '../../../../bounded-contexts/recommendation-context/hooks/useRecommendations'
import { RecommendationPreferences } from '../../../../bounded-contexts/recommendation-context/domain/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RecommendationPreferencesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getRecommendationPreferences, updateRecommendationPreferences, loading, error } = useRecommendations()
  const [formError, setFormError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<RecommendationPreferences | null>(null)
  const [formLoading, setFormLoading] = useState(true)
  
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setFormLoading(true)
        const prefs = await getRecommendationPreferences(params.id)
        if (prefs) {
          setPreferences(prefs)
        }
      } catch (err) {
        setFormError('Failed to load recommendation preferences')
        console.error(err)
      } finally {
        setFormLoading(false)
      }
    }
    
    fetchPreferences()
  }, [params.id, getRecommendationPreferences])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    
    setPreferences(prev => {
      if (!prev) return null
      
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
      }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    if (!preferences) return
    
    try {
      await updateRecommendationPreferences(params.id, preferences)
      router.push('/recommendations')
    } catch (err) {
      setFormError('Failed to update preferences')
      console.error(err)
    }
  }
  
  if (formLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }
  
  if (!preferences) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {formError || 'Failed to load recommendation preferences'}
        </div>
        <div className="mt-4">
          <Link href="/recommendations" className="text-purple-600">
            &larr; Back to Recommendations
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/recommendations" className="text-purple-600">
          &larr; Back to Recommendations
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Recommendation Preferences</h1>
        
        {(error || formError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Matching Priorities</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="prioritizeSkills"
                    name="prioritizeSkills"
                    className="mr-2"
                    checked={preferences.prioritizeSkills}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="prioritizeSkills" className="text-gray-700">
                    Prioritize skill matches
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="prioritizeLocation"
                    name="prioritizeLocation"
                    className="mr-2"
                    checked={preferences.prioritizeLocation}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="prioritizeLocation" className="text-gray-700">
                    Prioritize location matches
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="prioritizeSalary"
                    name="prioritizeSalary"
                    className="mr-2"
                    checked={preferences.prioritizeSalary}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="prioritizeSalary" className="text-gray-700">
                    Prioritize salary matches
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Filtering Options</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="excludeAppliedJobs"
                    name="excludeAppliedJobs"
                    className="mr-2"
                    checked={preferences.excludeAppliedJobs}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="excludeAppliedJobs" className="text-gray-700">
                    Exclude jobs I've already applied to
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="excludeRejectedJobs"
                    name="excludeRejectedJobs"
                    className="mr-2"
                    checked={preferences.excludeRejectedJobs}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="excludeRejectedJobs" className="text-gray-700">
                    Exclude jobs I've been rejected from
                  </label>
                </div>
                
                <div>
                  <label htmlFor="minimumMatchScore" className="block text-gray-700 mb-2">
                    Minimum match score (%)
                  </label>
                  <input
                    type="number"
                    id="minimumMatchScore"
                    name="minimumMatchScore"
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={preferences.minimumMatchScore}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => router.push('/recommendations')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
