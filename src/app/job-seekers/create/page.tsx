'use client'

import { useState } from 'react'
import { useJobSeekers } from '../../../bounded-contexts/job-seeker-context/hooks/useJobSeekers'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateJobSeekerProfilePage() {
  const router = useRouter()
  const { createJobSeeker, loading, error } = useJobSeekers()
  const [formError, setFormError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    userId: 'current-user', // In a real app, this would come from auth context
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    title: '',
    summary: '',
    skills: [''],
    experience: [{
      id: '1',
      company: '',
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      skills: ['']
    }],
    education: [{
      id: '1',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }],
    languages: [{
      language: '',
      proficiency: 'INTERMEDIATE'
    }],
    preferences: {
      jobTypes: ['FULL_TIME'],
      locations: [''],
      remoteOnly: false,
      industries: [''],
      jobTitles: [''],
      technologies: [''],
      relocationWilling: false,
      availableFrom: ''
    },
    resumeUrl: '',
    profilePictureUrl: ''
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
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    }
  }
  
  const handleArrayChange = (index: number, value: string, field: 'skills' | 'preferences.locations' | 'preferences.industries' | 'preferences.jobTitles' | 'preferences.technologies') => {
    if (field === 'skills') {
      setFormData(prev => {
        const newSkills = [...prev.skills]
        newSkills[index] = value
        return {
          ...prev,
          skills: newSkills
        }
      })
    } else {
      const [parent, child] = field.split('.')
      setFormData(prev => {
        const newArray = [...prev.preferences[child as keyof typeof prev.preferences] as string[]]
        newArray[index] = value
        return {
          ...prev,
          preferences: {
            ...prev.preferences,
            [child]: newArray
          }
        }
      })
    }
  }
  
  const addArrayItem = (field: 'skills' | 'preferences.locations' | 'preferences.industries' | 'preferences.jobTitles' | 'preferences.technologies') => {
    if (field === 'skills') {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, '']
      }))
    } else {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [child]: [...prev.preferences[child as keyof typeof prev.preferences] as string[], '']
        }
      }))
    }
  }
  
  const removeArrayItem = (index: number, field: 'skills' | 'preferences.locations' | 'preferences.industries' | 'preferences.jobTitles' | 'preferences.technologies') => {
    if (field === 'skills') {
      setFormData(prev => {
        const newSkills = [...prev.skills]
        newSkills.splice(index, 1)
        return {
          ...prev,
          skills: newSkills
        }
      })
    } else {
      const [parent, child] = field.split('.')
      setFormData(prev => {
        const newArray = [...prev.preferences[child as keyof typeof prev.preferences] as string[]]
        newArray.splice(index, 1)
        return {
          ...prev,
          preferences: {
            ...prev.preferences,
            [child]: newArray
          }
        }
      })
    }
  }
  
  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => {
      const newExperience = [...prev.experience]
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      }
      return {
        ...prev,
        experience: newExperience
      }
    })
  }
  
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `${prev.experience.length + 1}`,
          company: '',
          title: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          skills: ['']
        }
      ]
    }))
  }
  
  const removeExperience = (index: number) => {
    setFormData(prev => {
      const newExperience = [...prev.experience]
      newExperience.splice(index, 1)
      return {
        ...prev,
        experience: newExperience
      }
    })
  }
  
  const handleEducationChange = (index: number, field: string, value: string | boolean) => {
    setFormData(prev => {
      const newEducation = [...prev.education]
      newEducation[index] = {
        ...newEducation[index],
        [field]: value
      }
      return {
        ...prev,
        education: newEducation
      }
    })
  }
  
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: `${prev.education.length + 1}`,
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }))
  }
  
  const removeEducation = (index: number) => {
    setFormData(prev => {
      const newEducation = [...prev.education]
      newEducation.splice(index, 1)
      return {
        ...prev,
        education: newEducation
      }
    })
  }
  
  const handleLanguageChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newLanguages = [...prev.languages]
      newLanguages[index] = {
        ...newLanguages[index],
        [field]: value
      }
      return {
        ...prev,
        languages: newLanguages
      }
    })
  }
  
  const addLanguage = () => {
    setFormData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          language: '',
          proficiency: 'INTERMEDIATE'
        }
      ]
    }))
  }
  
  const removeLanguage = (index: number) => {
    setFormData(prev => {
      const newLanguages = [...prev.languages]
      newLanguages.splice(index, 1)
      return {
        ...prev,
        languages: newLanguages
      }
    })
  }
  
  const handleJobTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => {
      const newJobTypes = checked
        ? [...prev.preferences.jobTypes, type]
        : prev.preferences.jobTypes.filter(t => t !== type)
      
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          jobTypes: newJobTypes
        }
      }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.title || !formData.summary) {
      setFormError('Please fill in all required fields')
      return
    }
    
    if (formData.skills.some(skill => !skill)) {
      setFormError('Please fill in all skills or remove empty ones')
      return
    }
    
    try {
      const result = await createJobSeeker(formData)
      if (result) {
        router.push(`/job-seekers/${result.id}`)
      }
    } catch (err) {
      setFormError('Failed to create job seeker profile')
      console.error(err)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/job-seekers" className="text-green-600">
          &larr; Back to Job Seekers
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Create Job Seeker Profile</h1>
        
        {(error || formError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || formError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.lastName}
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
                  Phone
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
                <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="e.g., Frontend Developer, Project Manager"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="profilePictureUrl">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  id="profilePictureUrl"
                  name="profilePictureUrl"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="https://example.com/profile.jpg"
                  value={formData.profilePictureUrl}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="summary">
                  Professional Summary *
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Brief overview of your professional background and expertise"
                  value={formData.summary}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-l"
                  value={skill}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'skills')}
                  placeholder={`Skill ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-2"
                  onClick={() => removeArrayItem(index, 'skills')}
                  disabled={formData.skills.length <= 1}
                >
                  -
                </button>
                {index === formData.skills.length - 1 && (
                  <button
                    type="button"
                    className="bg-green-500 text-white px-3 py-2 rounded-r"
                    onClick={() => addArrayItem('skills')}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Work Experience */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                  {formData.experience.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={exp.title}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${index}`}>
                      I currently work here
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  {!exp.current && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              className="mt-2 text-green-600 flex items-center"
              onClick={addExperience}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Experience
            </button>
          </div>
          
          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Education {index + 1}</h3>
                  {formData.education.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id={`edu-current-${index}`}
                      checked={edu.current}
                      onChange={(e) => handleEducationChange(index, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`edu-current-${index}`}>
                      I am currently studying here
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    />
                  </div>
                  
                  {!edu.current && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={edu.endDate}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded"
                      value={edu.description}
                      onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              className="mt-2 text-green-600 flex items-center"
              onClick={addEducation}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Education
            </button>
          </div>
          
          {/* Languages */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Languages</h2>
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex mb-2 items-center">
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-l"
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  placeholder="Language"
                />
                <select
                  className="p-2 border-t border-b border-r border-gray-300"
                  value={lang.proficiency}
                  onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)}
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="NATIVE">Native</option>
                </select>
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-2"
                  onClick={() => removeLanguage(index)}
                  disabled={formData.languages.length <= 1}
                >
                  -
                </button>
                {index === formData.languages.length - 1 && (
                  <button
                    type="button"
                    className="bg-green-500 text-white px-3 py-2 rounded-r"
                    onClick={addLanguage}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Job Preferences */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Job Preferences</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Job Types
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="job-type-full-time"
                    checked={formData.preferences.jobTypes.includes('FULL_TIME')}
                    onChange={(e) => handleJobTypeChange('FULL_TIME', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="job-type-full-time">Full Time</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="job-type-part-time"
                    checked={formData.preferences.jobTypes.includes('PART_TIME')}
                    onChange={(e) => handleJobTypeChange('PART_TIME', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="job-type-part-time">Part Time</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="job-type-contract"
                    checked={formData.preferences.jobTypes.includes('CONTRACT')}
                    onChange={(e) => handleJobTypeChange('CONTRACT', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="job-type-contract">Contract</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="job-type-freelance"
                    checked={formData.preferences.jobTypes.includes('FREELANCE')}
                    onChange={(e) => handleJobTypeChange('FREELANCE', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="job-type-freelance">Freelance</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="job-type-internship"
                    checked={formData.preferences.jobTypes.includes('INTERNSHIP')}
                    onChange={(e) => handleJobTypeChange('INTERNSHIP', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="job-type-internship">Internship</label>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Locations
              </label>
              {formData.preferences.locations.map((location, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={location}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'preferences.locations')}
                    placeholder={`Location ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'preferences.locations')}
                    disabled={formData.preferences.locations.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.preferences.locations.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('preferences.locations')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remote-only"
                name="preferences.remoteOnly"
                checked={formData.preferences.remoteOnly}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="remote-only" className="text-gray-700">
                Remote work only
              </label>
            </div>
            
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="relocation-willing"
                name="preferences.relocationWilling"
                checked={formData.preferences.relocationWilling}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="relocation-willing" className="text-gray-700">
                Willing to relocate
              </label>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="availableFrom">
                Available From
              </label>
              <input
                type="date"
                id="availableFrom"
                name="preferences.availableFrom"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.preferences.availableFrom}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Industries
              </label>
              {formData.preferences.industries.map((industry, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={industry}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'preferences.industries')}
                    placeholder={`Industry ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'preferences.industries')}
                    disabled={formData.preferences.industries.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.preferences.industries.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('preferences.industries')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Job Titles
              </label>
              {formData.preferences.jobTitles.map((title, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={title}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'preferences.jobTitles')}
                    placeholder={`Job Title ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'preferences.jobTitles')}
                    disabled={formData.preferences.jobTitles.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.preferences.jobTitles.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('preferences.jobTitles')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Preferred Technologies
              </label>
              {formData.preferences.technologies.map((tech, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                    value={tech}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'preferences.technologies')}
                    placeholder={`Technology ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-2"
                    onClick={() => removeArrayItem(index, 'preferences.technologies')}
                    disabled={formData.preferences.technologies.length <= 1}
                  >
                    -
                  </button>
                  {index === formData.preferences.technologies.length - 1 && (
                    <button
                      type="button"
                      className="bg-green-500 text-white px-3 py-2 rounded-r"
                      onClick={() => addArrayItem('preferences.technologies')}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Resume */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Resume</h2>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="resumeUrl">
                Resume URL
              </label>
              <input
                type="url"
                id="resumeUrl"
                name="resumeUrl"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="https://example.com/my-resume.pdf"
                value={formData.resumeUrl}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Please provide a link to your resume (Google Drive, Dropbox, etc.)
              </p>
            </div>
          </div>
          
          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
              onClick={() => router.push('/job-seekers')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
