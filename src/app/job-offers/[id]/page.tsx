'use client'

import { useState, useEffect } from 'react'
import { useJobOffers } from '../../../bounded-contexts/job-offering-context/hooks/useJobOffers'
import Link from 'next/link'
import { JobOffer } from '../../../bounded-contexts/job-offering-context/domain/types'

type Params = Promise<{ id: string }>

export default async function JobOfferDetailsPage({ params }: { params: Params }) {
  const { id } = await params;

  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getJobOfferById } = useJobOffers()

  useEffect(() => {
    const fetchJobOffer = async () => {
      try {
        setLoading(true)
        const offer = await getJobOfferById(id)
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
  }, [id, getJobOfferById])

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
        <Link href="/job-offers" className="text-blue-600">
          &larr; Back to Job Offers
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold">{jobOffer.title}</h1>
          <div className="flex flex-col md:flex-row md:justify-between mt-2">
            <div className="text-lg text-gray-700">{jobOffer.company}</div>
            <div className="text-gray-600">{jobOffer.location}</div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-gray-500 mr-4">Posted: {new Date(jobOffer.postedDate).toLocaleDateString()}</span>
            {jobOffer.deadline && (
              <span className="text-sm text-red-500">
                Deadline: {new Date(jobOffer.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{jobOffer.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {jobOffer.requirements.map((req, index) => (
              <li key={index} className="mb-1">{req}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {jobOffer.responsibilities.map((resp, index) => (
              <li key={index} className="mb-1">{resp}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Employment Type:</p>
              <p className="font-medium">{jobOffer.employmentType.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-gray-600">Remote:</p>
              <p className="font-medium">{jobOffer.remote ? 'Yes' : 'No'}</p>
            </div>
            {jobOffer.salary && (
              <div>
                <p className="text-gray-600">Salary Range:</p>
                <p className="font-medium">
                  {jobOffer.salary.min && `${jobOffer.salary.currency} ${jobOffer.salary.min.toLocaleString()}`}
                  {jobOffer.salary.min && jobOffer.salary.max && ' - '}
                  {jobOffer.salary.max && `${jobOffer.salary.currency} ${jobOffer.salary.max.toLocaleString()}`}
                </p>
              </div>
            )}
            <div>
              <p className="text-gray-600">Contact:</p>
              <p className="font-medium">{jobOffer.contactEmail}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={`/job-offers/${jobOffer.id}/apply`}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            Apply for this Position
          </Link>
        </div>
      </div>
    </div>
  )
}
