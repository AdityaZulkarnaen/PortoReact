import { useState, useEffect } from 'react'
import { DataService } from '../services/dataService'
import { Link } from 'react-router-dom'

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    display_order: 0
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadExperiences()
  }, [])

  const loadExperiences = async () => {
    setLoading(true)
    try {
      const result = await DataService.getExperience()
      if (result.success) {
        setExperiences(result.data || [])
      } else {
        setError('Failed to load experiences')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      display_order: 0
    })
    setEditingExp(null)
    setShowForm(false)
    setError('')
  }

  const handleEdit = (exp) => {
    setFormData({
      position: exp.position || '',
      company: exp.company || '',
      location: exp.location || '',
      start_date: exp.start_date ? exp.start_date.slice(0, 7) : '',
      end_date: exp.end_date ? exp.end_date.slice(0, 7) : '',
      is_current: exp.is_current || false,
      description: exp.description || '',
      display_order: exp.display_order || 0
    })
    setEditingExp(exp)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const payload = {
      ...formData,
      start_date: formData.start_date ? formData.start_date + '-01' : null,
      end_date: formData.is_current ? null : (formData.end_date ? formData.end_date + '-01' : null),
      display_order: parseInt(formData.display_order) || 0
    }

    try {
      let result
      if (editingExp) {
        result = await DataService.updateExperience(editingExp.id, payload)
      } else {
        result = await DataService.addExperience(payload)
      }

      if (result.success) {
        setSuccess(editingExp ? 'Experience updated!' : 'Experience added!')
        resetForm()
        loadExperiences()
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(result.error || 'Operation failed')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return
    const result = await DataService.deleteExperience(id)
    if (result.success) {
      setSuccess('Experience deleted!')
      loadExperiences()
      setTimeout(() => setSuccess(''), 3000)
    } else {
      setError(result.error)
    }
  }

  const formatPeriod = (exp) => {
    const start = exp.start_date
      ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
      : ''
    const end = exp.is_current
      ? 'Present'
      : exp.end_date
        ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
        : ''
    return start && end ? `${start} - ${end}` : start || end
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">
                ← Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Experience Manager</h1>
            </div>
            <button
              onClick={() => { resetForm(); setShowForm(true) }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              + Add Experience
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {editingExp ? 'Edit Experience' : 'Add New Experience'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g. Google"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Yogyakarta, Indonesia"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="month"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    disabled={formData.is_current}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_current"
                  checked={formData.is_current}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_current: e.target.checked, end_date: '' }))}
                  className="w-4 h-4"
                />
                <label htmlFor="is_current" className="text-sm font-medium text-gray-700">
                  Currently working here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your role, responsibilities, and achievements..."
                />
              </div>

              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                  <span className="text-xs text-gray-500 block">Lower = shown first</span>
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_order: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0, 1, 2..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
                >
                  {editingExp ? 'Update' : 'Add Experience'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No experiences yet.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
            >
              Add Your First Experience
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      {exp.is_current && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-1">
                      <span>{formatPeriod(exp)}</span>
                      {exp.location && <span>· {exp.location}</span>}
                      <span>· Order: {exp.display_order}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">{exp.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-indigo-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="bg-red-50 text-red-600 px-3 py-1.5 rounded text-sm font-medium hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperienceManager
