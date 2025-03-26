'use client'

import { useState } from 'react'
import { useJobOffers } from '../../../../bounded-contexts/job-offering-context/hooks/useJobOffers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateJobOfferPage() {
  const router = useRouter()
  const { createJobOffer, loading, error } = useJobOffers()
  const [formError, setFormError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: [''],
    responsibilities: [''],
    employmentType: 'FULL_TIME',
    remote: false,
    contactEmail: '',
    salary: {
      min: '',
      max: '',
      currency: 'USD'
    },
    deadline: ''
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleArrayChange = (index: number, value: string, field: 'requirements' | 'responsibilities') => {
    setFormData(prev => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return {
        ...prev,
        [field]: newArray
      }
    })
  }
  
  const addArrayItem = (field: 'requirements' | 'responsibilities') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }
  
  const removeArrayItem = (index: number, field: 'requirements' | 'responsibilities') => {
    setFormData(prev => {
      const newArray = [...prev[field]]
      newArray.splice(index, 1)
      return {
        ...prev,
        [field]: newArray
      }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    // Validation
    if (!formData.title || !formData.company || !formData.location || !formData.description || !formData.contactEmail) {
      setFormError('Please fill in all required fields')
      return
    }
    
    if (formData.requirements.some(req => !req) || formData.responsibilities.some(resp => !resp)) {
      setFormError('Please fill in all requirements and responsibilities or remove empty ones')
      return
    }
    
    try {
      // Format the data for submission
      const jobOfferData = {
        ...formData,
        salary: formData.salary.min || formData.salary.max ? {
          min: formData.salary.min ? parseInt(formData.salary.min) : undefined,
          max: formData.salary.max ? parseInt(formData.salary.max) : undefined,
          currency: formData.salary.currency
        } : undefined
      }
      
      const result = await createJobOffer(jobOfferData)
      if (result) {
        router.push(`/job-offers/${result.id}`)
      }
    } catch (err) {
      setFormError('Failed to create job offer')
      console.error(err)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/job-offers" className="text-blue-600">
          &larr; Back to Job Offers
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Post a New Job Offer</h1>
        
        {(error || formError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="company">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="employmentType">
                Employment Type *
              </label>
              <select
                id="employmentType"
                name="employmentType"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.employmentType}
                onChange={handleInputChange}
                required
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="FREELANCE">Freelance</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Requirements *
              </label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={req}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                    placeholder={`Requirement ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'requirements')}
                    disabled={formData.requirements.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.requirements.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('requirements')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Responsibilities *
              </label>
              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={resp}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'responsibilities')}
                    placeholder={`Responsibility ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'responsibilities')}
                    disabled={formData.responsibilities.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.responsibilities.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('responsibilities')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Salary Range (Optional)
              </label>
              <div className="flex items-center">
                <select
                  name="salary.currency"
                  className="p-2 border border-gray-300 rounded-l"
                  value={formData.salary.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  type="number"
                  name="salary.min"
                  placeholder="Min"
                  className="flex-grow p-2 border-t border-b border-gray-300"
                  value={formData.salary.min}
                  onChange={handleInputChange}
                />
                <span className="p-2 border-t border-b border-gray-300">-</span>
                <input
                  type="number"
                  name="salary.max"
                  placeholder="Max"
                  className="flex-grow p-2 border border-gray-300 rounded-r"
                  value={formData.salary.max}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="deadline">
                Application Deadline (Optional)
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.deadline}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="contactEmail">
                Contact Email *
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                className="mr-2"
                checked={formData.remote}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="remote" className="text-gray-700">
                This is a remote position
              </label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => router.push('/job-offers')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
