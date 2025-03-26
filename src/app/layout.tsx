import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobMatch - Find Your Perfect Career Match',
  description: 'Connect job seekers with opportunities using our intelligent matching system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navbar />
        <div className="pt-4 pb-12">
          {children}
        </div>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">JobMatch</h3>
                <p className="text-gray-300">
                  Connecting talent with opportunities through intelligent matching.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/job-offers" className="text-gray-300 hover:text-white">Job Offers</a></li>
                  <li><a href="/job-seekers" className="text-gray-300 hover:text-white">Job Seekers</a></li>
                  <li><a href="/recommendations" className="text-gray-300 hover:text-white">Recommendations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Actions</h3>
                <ul className="space-y-2">
                  <li><a href="/job-offers/create" className="text-gray-300 hover:text-white">Post a Job</a></li>
                  <li><a href="/job-seekers/create" className="text-gray-300 hover:text-white">Create Profile</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} JobMatch. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
