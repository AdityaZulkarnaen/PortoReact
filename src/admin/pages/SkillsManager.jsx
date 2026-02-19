import { useState, useEffect } from 'react'
import { DataService } from '../services/dataService'
import ImageUpload from '../components/ImageUpload'
import { IMAGE_TYPES } from '../../lib/supabaseClient'
import { Link } from 'react-router-dom'

const SkillsManager = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    icon_url: '',
    icon_path: '',
    is_active: true,
    display_order: 0,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    setLoading(true)
    try {
      const result = await DataService.getAllSkills()
      if (result.success) {
        setSkills(result.data || [])
      } else {
        setError('Failed to load skills')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', icon_url: '', icon_path: '', is_active: true, display_order: 0 })
    setEditingSkill(null)
    setShowForm(false)
    setError('')
  }

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name || '',
      icon_url: skill.icon_url || '',
      icon_path: skill.icon_path || '',
      is_active: skill.is_active ?? true,
      display_order: skill.display_order || 0,
    })
    setEditingSkill(skill)
    setShowForm(true)
    setError('')
  }

  const handleIconUpload = (result) => {
    if (result.success) {
      setFormData(prev => ({ ...prev, icon_url: result.url, icon_path: result.path }))
      setSuccess('Icon uploaded!')
    } else {
      setError('Upload failed: ' + result.error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const result = editingSkill
        ? await DataService.updateSkill(editingSkill.id, formData)
        : await DataService.addSkill(formData)

      if (result.success) {
        setSuccess(editingSkill ? 'Skill updated!' : 'Skill added!')
        resetForm()
        loadSkills()
      } else {
        setError(result.error || 'Failed to save skill')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return
    try {
      const result = await DataService.deleteSkill(id)
      if (result.success) {
        setSuccess('Skill deleted!')
        loadSkills()
      } else {
        setError(result.error || 'Failed to delete')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">â† Dashboard</Link>
              <h1 className="text-xl font-semibold text-gray-900">Skills Manager</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              + Add Skill
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="e.g. React JS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                {formData.icon_url && (
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src={formData.icon_url}
                      alt="current icon"
                      className="h-12 w-12 object-contain border rounded p-1 bg-gray-50"
                    />
                    <span className="text-xs text-gray-500">Current icon</span>
                  </div>
                )}
                <ImageUpload
                  imageType={IMAGE_TYPES.ICON}
                  folder="icons"
                  onUploadSuccess={handleIconUpload}
                  onUploadError={(err) => setError('Upload error: ' + err)}
                  accept="image/*"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Display Order</label>
                <input
                  type="number" name="display_order" value={formData.display_order} onChange={handleChange}
                  className="mt-1 block w-32 border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox" name="is_active" id="is_active"
                  checked={formData.is_active} onChange={handleChange} className="h-4 w-4"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                  Active (visible on portfolio)
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  {editingSkill ? 'Update' : 'Add Skill'}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Icon</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {skills.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No skills yet. Add one!</td></tr>
                ) : (
                  skills.map(skill => (
                    <tr key={skill.id}>
                      <td className="px-4 py-3 text-sm text-gray-500">{skill.display_order}</td>
                      <td className="px-4 py-3">
                        {skill.icon_url
                          ? <img src={skill.icon_url} alt={skill.name} className="h-8 w-8 object-contain" />
                          : <span className="text-gray-400 text-xs">â€”</span>
                        }
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{skill.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                          skill.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {skill.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                          <button onClick={() => handleDelete(skill.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsManager
