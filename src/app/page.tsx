'use client'

import Link from 'next/link'
import { useJobOffers } from '../bounded-contexts/job-offering-context/hooks/useJobOffers'
import { useJobSeekers } from '../bounded-contexts/job-seeker-context/hooks/useJobSeekers'
import { useEffect, useState } from 'react'
import { JobOffer } from '../bounded-contexts/job-offering-context/domain/types'
import { JobSeeker } from '../bounded-contexts/job-seeker-context/domain/types'

export default function HomePage() {
  const { jobOffers, loading: jobOffersLoading } = useJobOffers()
  const { jobSeekers, loading: jobSeekersLoading } = useJobSeekers()
  const [featuredJobs, setFeaturedJobs] = useState<JobOffer[]>([])
  const [featuredProfiles, setFeaturedProfiles] = useState<JobSeeker[]>([])

  useEffect(() => {
    // Select a few featured jobs
    if (jobOffers.length > 0) {
      setFeaturedJobs(jobOffers.slice(0, 3))
    }

    // Select a few featured profiles
    if (jobSeekers.length > 0) {
      setFeaturedProfiles(jobSeekers.slice(0, 3))
    }
  }, [jobOffers, jobSeekers])

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Career Match</h1>
          <p className="text-xl mb-8">Connect job seekers with opportunities using our intelligent matching system</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/job-offers" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors">
              Browse Job Offers
            </Link>
            <Link href="/job-seekers" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors">
              Find Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Post Job Offers</h3>
            <p className="text-gray-600">Companies can create detailed job listings with requirements, responsibilities, and benefits.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-gray-600">Job seekers can build comprehensive profiles showcasing their skills and experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-600">Our recommendation engine connects the right talent with the right opportunities.</p>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Job Offers</h2>
          <Link href="/job-offers" className="text-blue-600 hover:underline">View All</Link>
        </div>

        {jobOffersLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : featuredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-500 mb-4">{job.location}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/job-offers/${job.id}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No job offers available at the moment.
          </div>
        )}
      </section>

      {/* Featured Profiles Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Talent Profiles</h2>
          <Link href="/job-seekers" className="text-green-600 hover:underline">View All</Link>
        </div>

        {jobSeekersLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : featuredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProfiles.map(profile => (
              <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {profile.profilePictureUrl ? (
                      <img
                        src={profile.profilePictureUrl}
                        alt={`${profile.firstName} ${profile.lastName}`}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-4">
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h3>
                      <p className="text-gray-600">{profile.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/job-seekers/${profile.id}`}
                    className="block text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No profiles available at the moment.
          </div>
        )}
      </section>

      {/* Recommendation Engine Section */}
      <section className="bg-purple-50 rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Intelligent Matching</h2>
          <p className="text-xl mb-6">Our recommendation engine uses advanced algorithms to match job seekers with the perfect opportunities based on skills, experience, and preferences.</p>
          <Link href="/recommendations" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-purple-700 transition-colors">
            Explore Recommendations
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-100 rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">Join our platform today and find your perfect career match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/job-offers/create" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors">
              Post a Job
            </Link>
            <Link href="/job-seekers/create" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors">
              Create Profile
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
