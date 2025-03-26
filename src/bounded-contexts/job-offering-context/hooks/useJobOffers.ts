'use client'

import { useState, useEffect } from 'react'
import { JobOffer } from '../domain/types'
import { MockJobOfferingRepository } from '../adapter/mock-repository'

export function useJobOffers() {
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const repository = new MockJobOfferingRepository()
  
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        setLoading(true)
        const offers = await repository.getJobOffers()
        setJobOffers(offers)
        setError(null)
      } catch (err) {
        setError('Failed to fetch job offers')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobOffers()
  }, [])
  
  const searchJobOffers = async (query: string) => {
    try {
      setLoading(true)
      const results = await repository.searchJobOffers(query)
      setJobOffers(results)
      setError(null)
    } catch (err) {
      setError('Failed to search job offers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const getJobOfferById = async (id: string) => {
    try {
      setLoading(true)
      const offer = await repository.getJobOfferById(id)
      return offer
    } catch (err) {
      setError('Failed to fetch job offer details')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  const createJobOffer = async (jobOffer: Omit<JobOffer, 'id' | 'createdBy' | 'updatedAt'>) => {
    try {
      setLoading(true)
      const newOffer = await repository.createJobOffer(jobOffer)
      setJobOffers(prev => [...prev, newOffer])
      return newOffer
    } catch (err) {
      setError('Failed to create job offer')
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }
  
  return {
    jobOffers,
    loading,
    error,
    searchJobOffers,
    getJobOfferById,
    createJobOffer
  }
}
