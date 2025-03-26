'use client'

import { useState, useEffect } from 'react'
import { useJobOffers } from '../../../../bounded-contexts/job-offering-context/hooks/useJobOffers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { JobOffer } from '../../../../bounded-contexts/job-offering-context/domain/types'

export default function ApplyJobPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getJobOfferById } = useJobOffers()
  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverLetter: ''
  })
  
  useEffect(() => {
    const fetchJobOffer = async () => {
      try {
        setLoading(true)
        const offer = await getJobOfferById(params.id)
        if (offer) {
          setJobOffer(offer)
        } else {
          setError('Job offer not found')
        }
      } catch (err) {
        setError('Failed to load job offer details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobOffer()
  }, [params.id, getJobOfferById])
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.resumeUrl) {
      setFormError('Please fill in all required fields')
      return
    }
    
    try {
      setSubmitting(true)
      
      // In a real application, this would call a method from a hook to submit the application
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to success page
      router.push(`/job-offers/${params.id}/apply/success`)
    } catch (err) {
      setFormError('Failed to submit application')
      console.error(err)
      setSubmitting(false)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }
  
  if (error || !jobOffer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Job offer not found'}
        </div>
        <div className="mt-4">
          <Link href="/job-offers" className="text-blue-600">
            &larr; Back to Job Offers
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href={`/job-offers/${params.id}`} className="text-blue-600">
          &larr; Back to Job Details
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
        <h2 className="text-xl text-gray-700 mb-6">{jobOffer.title} at {jobOffer.company}</h2>
        
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="fullName">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="resumeUrl">
                Resume URL *
              </label>
              <input
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="https://example.com/my-resume.pdf"
                value={formData.resumeUrl}
                onChange={handleInputChange}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Please provide a link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="coverLetter">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={6}
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you're interested in this position and why you'd be a good fit..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => router.push(`/job-offers/${params.id}`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
