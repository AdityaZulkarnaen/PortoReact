import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'


const AdminDashboard = () => {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Portfolio Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Profile Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage personal information, bio, and profile images
                </p>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    Manage Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Add, edit, and organize your technical skills
                </p>
                <div className="mt-4">
                  <Link to="/admin/skills" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 inline-block">
                    Manage Skills
                  </Link>
                </div>
              </div>
            </div>

            {/* Projects Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Projects</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Showcase your latest work and projects
                </p>
                <div className="mt-4">
                  <Link to="/admin/projects" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 inline-block">
                    Manage Projects
                  </Link>
                </div>
              </div>
            </div>

            {/* Experience Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Experience</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Update your work history and experiences
                </p>
                <div className="mt-4">
                  <Link to="/admin/experience" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 inline-block">
                    Manage Experience
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Update contact information and social links
                </p>
                <div className="mt-4">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-700">
                    Manage Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Media Management */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Media</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Manage images, assets, and file uploads
                </p>
                <div className="mt-4">
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-700">
                    Manage Media
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard