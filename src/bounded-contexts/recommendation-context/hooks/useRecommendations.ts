'use client'

import { useState, useEffect } from 'react'
import { JobRecommendation, RecommendationPreferences, SeekerProfileMatch } from '../domain/types'
import { MockRecommendationRepository } from '../adapter/mock-repository'

export function useRecommendations() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const repository = new MockRecommendationRepository()
  
  // Job recommendations for a seeker
  const getRecommendationsForSeeker = async (seekerId: string) => {
    try {
      setLoading(true)
      const recommendations = await repository.getRecommendationsForSeeker(seekerId)
      return recommendations
    } catch (err) {
      setError('Failed to fetch job recommendations')
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  const generateRecommendationsForSeeker = async (seekerId: string) => {
    try {
      setLoading(true)
      const recommendations = await repository.generateRecommendationsForSeeker(seekerId)
      return recommendations
    } catch (err) {
      setError('Failed to generate job recommendations')
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  const updateRecommendationStatus = async (id: string, status: JobRecommendation['status']) => {
    try {
      setLoading(true)
      const updatedRecommendation = await repository.updateRecommendationStatus(id, status)
      return updatedRecommendation
    } catch (err) {
      setError('Failed to update recommendation status')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  // Seeker profiles matching a job
  const getMatchingProfilesForJob = async (jobOfferId: string) => {
    try {
      setLoading(true)
      const profiles = await repository.getMatchingProfilesForJob(jobOfferId)
      return profiles
    } catch (err) {
      setError('Failed to fetch matching profiles')
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  const generateMatchingProfilesForJob = async (jobOfferId: string) => {
    try {
      setLoading(true)
      const profiles = await repository.generateMatchingProfilesForJob(jobOfferId)
      return profiles
    } catch (err) {
      setError('Failed to generate matching profiles')
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }
  
  // Recommendation preferences
  const getRecommendationPreferences = async (seekerId: string) => {
    try {
      setLoading(true)
      const preferences = await repository.getRecommendationPreferences(seekerId)
      return preferences
    } catch (err) {
      setError('Failed to fetch recommendation preferences')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  const updateRecommendationPreferences = async (seekerId: string, preferences: Partial<RecommendationPreferences>) => {
    try {
      setLoading(true)
      const updatedPreferences = await repository.updateRecommendationPreferences(seekerId, preferences)
      return updatedPreferences
    } catch (err) {
      setError('Failed to update recommendation preferences')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  return {
    loading,
    error,
    getRecommendationsForSeeker,
    generateRecommendationsForSeeker,
    updateRecommendationStatus,
    getMatchingProfilesForJob,
    generateMatchingProfilesForJob,
    getRecommendationPreferences,
    updateRecommendationPreferences
  }
}
