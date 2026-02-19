import { supabase } from '../../lib/supabaseClient'

export class DataService {
  
  // Profile Info Services
  static async getProfileInfo() {
    try {
      const { data, error } = await supabase
        .from('profile_info')
        .select('*')
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateProfileInfo(profileData) {
    try {
      const { data, error } = await supabase
        .from('profile_info')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Profile Images Services
  static async getProfileImages() {
    try {
      const { data, error } = await supabase
        .from('profile_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async addProfileImage(imageData) {
    try {
      const { data, error } = await supabase
        .from('profile_images')
        .insert(imageData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async deleteProfileImage(id, imagePath) {
    try {
      // Delete from storage first
      if (imagePath) {
        await supabase.storage
          .from('portfolio-images')
          .remove([imagePath])
      }

      // Then delete from database
      const { error } = await supabase
        .from('profile_images')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Skills Services
  static async getSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('is_active', true)
        .order('category, display_order')
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async addSkill(skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert(skillData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateSkill(id, skillData) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async deleteSkill(id) {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Projects Services
  static async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .neq('status', 'archived')
        .order('featured', { ascending: false })
        .order('display_order')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async addProject(projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateProject(id, projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async deleteProject(id, imagePath) {
    try {
      // Delete image from storage if exists
      if (imagePath) {
        await supabase.storage
          .from('portfolio-images')
          .remove([imagePath])
      }

      // Delete project from database
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Experience Services
  static async getExperience() {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('is_current DESC, end_date DESC NULLS FIRST, start_date DESC')
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async addExperience(experienceData) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .insert(experienceData)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateExperience(id, experienceData) {
    try {
      const { data, error } = await supabase
        .from('experience')
        .update(experienceData)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async deleteExperience(id) {
    try {
      const { error } = await supabase
        .from('experience')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Social Links Services
  static async getSocialLinks() {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateSocialLink(id, linkData) {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .upsert({ id, ...linkData }, { onConflict: 'id' })
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Contact Services
  static async getContactSettings() {
    try {
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async updateContactSettings(settingsData) {
    try {
      const { data, error } = await supabase
        .from('contact_settings')
        .upsert(settingsData, { onConflict: 'id' })
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  static async addContactMessage(messageData) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert({
          ...messageData,
          ip_address: null, // Will be handled by Supabase
          user_agent: navigator.userAgent
        })
        .select()
        .single()
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Utility function to verify admin access
  static async verifyAdminAccess() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        throw new Error('Admin access required')
      }
      return true
    } catch (error) {
      throw error
    }
  }
}