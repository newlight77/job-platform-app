'use client'

import { useState, useEffect } from 'react'
import { JobSeeker } from '../domain/types'
import { MockJobSeekerRepository } from '../adapter/mock-repository'

export function useJobSeekers() {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const repository = new MockJobSeekerRepository()
  
  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        setLoading(true)
        const seekers = await repository.getJobSeekers()
        setJobSeekers(seekers)
        setError(null)
      } catch (err) {
        setError('Failed to fetch job seekers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobSeekers()
  }, [])
  
  const searchJobSeekers = async (query: string) => {
    try {
      setLoading(true)
      const results = await repository.searchJobSeekers(query)
      setJobSeekers(results)
      setError(null)
    } catch (err) {
      setError('Failed to search job seekers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const getJobSeekerById = async (id: string) => {
    try {
      setLoading(true)
      const seeker = await repository.getJobSeekerById(id)
      return seeker
    } catch (err) {
      setError('Failed to fetch job seeker details')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  const createJobSeeker = async (jobSeeker: Omit<JobSeeker, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      const newSeeker = await repository.createJobSeeker(jobSeeker)
      setJobSeekers(prev => [...prev, newSeeker])
      return newSeeker
    } catch (err) {
      setError('Failed to create job seeker profile')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  const updateJobSeeker = async (id: string, jobSeeker: Partial<JobSeeker>) => {
    try {
      setLoading(true)
      const updatedSeeker = await repository.updateJobSeeker(id, jobSeeker)
      if (updatedSeeker) {
        setJobSeekers(prev => 
          prev.map(seeker => seeker.id === id ? updatedSeeker : seeker)
        )
      }
      return updatedSeeker
    } catch (err) {
      setError('Failed to update job seeker profile')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  const uploadResume = async (seekerId: string, resumeUrl: string) => {
    try {
      setLoading(true)
      const updatedSeeker = await repository.uploadResume(seekerId, resumeUrl)
      setJobSeekers(prev => 
        prev.map(seeker => seeker.id === seekerId ? updatedSeeker : seeker)
      )
      return updatedSeeker
    } catch (err) {
      setError('Failed to upload resume')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  return {
    jobSeekers,
    loading,
    error,
    searchJobSeekers,
    getJobSeekerById,
    createJobSeeker,
    updateJobSeeker,
    uploadResume
  }
}
