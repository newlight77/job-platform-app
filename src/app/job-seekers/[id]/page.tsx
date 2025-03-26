'use client'

import { useState, useEffect } from 'react'
import { useJobSeekers } from '../../../bounded-contexts/job-seeker-context/hooks/useJobSeekers'
import Link from 'next/link'
import { JobSeeker } from '../../../bounded-contexts/job-seeker-context/domain/types'

export default function JobSeekerProfilePage({ params }: { params: { id: string } }) {
  const [jobSeeker, setJobSeeker] = useState<JobSeeker | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getJobSeekerById } = useJobSeekers()
  
  useEffect(() => {
    const fetchJobSeeker = async () => {
      try {
        setLoading(true)
        const seeker = await getJobSeekerById(params.id)
        if (seeker) {
          setJobSeeker(seeker)
        } else {
          setError('Job seeker profile not found')
        }
      } catch (err) {
        setError('Failed to load job seeker profile')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobSeeker()
  }, [params.id, getJobSeekerById])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    )
  }
  
  if (error || !jobSeeker) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Job seeker profile not found'}
        </div>
        <div className="mt-4">
          <Link href="/job-seekers" className="text-green-600">
            &larr; Back to Job Seekers
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/job-seekers" className="text-green-600">
          &larr; Back to Job Seekers
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {jobSeeker.profilePictureUrl ? (
              <div className="w-24 h-24 rounded-full bg-white overflow-hidden mb-4 md:mb-0 md:mr-6">
                <img 
                  src={jobSeeker.profilePictureUrl} 
                  alt={`${jobSeeker.firstName} ${jobSeeker.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-white text-green-600 flex items-center justify-center text-3xl font-bold mb-4 md:mb-0 md:mr-6">
                {jobSeeker.firstName.charAt(0)}{jobSeeker.lastName.charAt(0)}
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold">{jobSeeker.firstName} {jobSeeker.lastName}</h1>
              <p className="text-xl mt-1">{jobSeeker.title}</p>
              <div className="mt-2 flex flex-col md:flex-row md:items-center">
                <p className="text-green-100">{jobSeeker.email}</p>
                {jobSeeker.phone && (
                  <p className="md:ml-4 text-green-100">{jobSeeker.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Summary</h2>
            <p className="text-gray-700">{jobSeeker.summary}</p>
          </div>
          
          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {jobSeeker.skills.map((skill, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Work Experience</h2>
            {jobSeeker.experience && jobSeeker.experience.length > 0 ? (
              <div className="space-y-6">
                {jobSeeker.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-green-200 pl-4">
                    <h3 className="text-xl font-medium">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company} • {exp.location}</p>
                    <p className="text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })} - 
                      {exp.current 
                        ? ' Present'
                        : exp.endDate 
                          ? ` ${new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}`
                          : ''
                      }
                    </p>
                    <p className="mt-2 text-gray-700">{exp.description}</p>
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {exp.skills.map((skill, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No work experience listed</p>
            )}
          </div>
          
          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Education</h2>
            {jobSeeker.education && jobSeeker.education.length > 0 ? (
              <div className="space-y-6">
                {jobSeeker.education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-green-200 pl-4">
                    <h3 className="text-xl font-medium">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                    <p className="text-gray-500">
                      {new Date(edu.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })} - 
                      {edu.current 
                        ? ' Present'
                        : edu.endDate 
                          ? ` ${new Date(edu.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}`
                          : ''
                      }
                    </p>
                    {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No education listed</p>
            )}
          </div>
          
          {/* Certifications */}
          {jobSeeker.certifications && jobSeeker.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Certifications</h2>
              <div className="space-y-4">
                {jobSeeker.certifications.map((cert) => (
                  <div key={cert.id} className="border-l-4 border-green-200 pl-4">
                    <h3 className="text-xl font-medium">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuingOrganization}</p>
                    <p className="text-gray-500">
                      Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      {cert.expirationDate && ` • Expires: ${new Date(cert.expirationDate).toLocaleDateString()}`}
                    </p>
                    {cert.credentialUrl && (
                      <a 
                        href={cert.credentialUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline mt-1 inline-block"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Languages */}
          {jobSeeker.languages && jobSeeker.languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Languages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobSeeker.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{lang.language}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {lang.proficiency.charAt(0) + lang.proficiency.slice(1).toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Job Preferences */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Job Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <h3 className="font-medium text-gray-700">Job Types</h3>
                <p>{jobSeeker.preferences.jobTypes.map(type => type.replace('_', ' ')).join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Preferred Locations</h3>
                <p>{jobSeeker.preferences.locations.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Remote Work</h3>
                <p>{jobSeeker.preferences.remoteOnly ? 'Remote only' : 'Open to on-site'}</p>
              </div>
              
              {jobSeeker.preferences.salaryExpectation && (
                <div>
                  <h3 className="font-medium text-gray-700">Salary Expectation</h3>
                  <p>
                    {jobSeeker.preferences.salaryExpectation.min && `${jobSeeker.preferences.salaryExpectation.currency} ${jobSeeker.preferences.salaryExpectation.min.toLocaleString()}`}
                    {jobSeeker.preferences.salaryExpectation.min && jobSeeker.preferences.salaryExpectation.max && ' - '}
                    {jobSeeker.preferences.salaryExpectation.max && `${jobSeeker.preferences.salaryExpectation.currency} ${jobSeeker.preferences.salaryExpectation.max.toLocaleString()}`}
                  </p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-gray-700">Preferred Industries</h3>
                <p>{jobSeeker.preferences.industries.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Preferred Job Titles</h3>
                <p>{jobSeeker.preferences.jobTitles.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Preferred Technologies</h3>
                <p>{jobSeeker.preferences.technologies.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700">Relocation</h3>
                <p>{jobSeeker.preferences.relocationWilling ? 'Willing to relocate' : 'Not willing to relocate'}</p>
              </div>
              
              {jobSeeker.preferences.availableFrom && (
                <div>
                  <h3 className="font-medium text-gray-700">Available From</h3>
                  <p>{new Date(jobSeeker.preferences.availableFrom).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Resume */}
          {jobSeeker.resumeUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Resume</h2>
              <a 
                href={jobSeeker.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Resume
              </a>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="bg-gray-50 p-6 flex justify-end">
          <Link 
            href={`/job-seekers/${jobSeeker.id}/edit`}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
