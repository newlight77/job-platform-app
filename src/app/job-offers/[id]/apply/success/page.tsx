'use client'

import { useState } from 'react'
import Link from 'next/link'

type Params = Promise<{ id: string }>

export default async function ApplicationSuccessPage( props : { params: Params }) {
  const { id } = await props.params;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
        <p className="text-gray-600 mb-6">
          Your application has been successfully submitted. The employer will review your application and contact you if they're interested.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href={`/job-offers/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Return to Job Details
          </Link>
          <Link
            href="/job-offers"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          >
            Browse More Jobs
          </Link>
        </div>
      </div>
    </div>
  )
}
