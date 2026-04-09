import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { User, Mail, Phone, Globe, Calendar, Edit2, KeyRound, Save, X } from 'lucide-react'
import apiClient from '../../config/api'

interface ProfileFormData {
  firstName: string
  lastName: string
  phoneNumber: string
  country: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { user: credentialUser } = useAuth()
  const { isSignedIn } = useClerkAuth()
  const { user: clerkUser } = useUser()

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const activeUser = isSignedIn ? clerkUser : credentialUser

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } =
    useForm<ProfileFormData>({
      defaultValues: {
        firstName: (activeUser as any)?.firstName || (activeUser as any)?.first_name || '',
        lastName: (activeUser as any)?.lastName || (activeUser as any)?.last_name || '',
        phoneNumber: (credentialUser as any)?.phoneNumber || '',
        country: (credentialUser as any)?.country || '',
      },
    })

  const { register: regPwd, handleSubmit: handlePassword, watch, reset: resetPwd, formState: { errors: pwdErrors } } =
    useForm<PasswordFormData>()

  const newPassword = watch('newPassword')

  const onSaveProfile = async (data: ProfileFormData) => {
    setSavingProfile(true)
    try {
      await apiClient.patch('/v1/users/profile', data)
      toast.success('Profile updated successfully')
      setEditingProfile(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const onChangePassword = async (data: PasswordFormData) => {
    setSavingPassword(true)
    try {
      await apiClient.post('/v1/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      toast.success('Password changed successfully')
      setEditingPassword(false)
      resetPwd()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setSavingPassword(false)
    }
  }

  const displayName = isSignedIn
    ? `${clerkUser?.firstName || ''} ${clerkUser?.lastName || ''}`.trim()
    : `${credentialUser?.firstName || ''} ${credentialUser?.lastName || ''}`.trim()

  const email = isSignedIn
    ? clerkUser?.primaryEmailAddress?.emailAddress
    : credentialUser?.email

  const joinDate = credentialUser?.createdAt
    ? new Date(credentialUser.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A'

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {displayName ? displayName[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">{displayName || 'User'}</h2>
                <p className="text-sm text-neutral-500">{email}</p>
              </div>
            </div>
            {!isSignedIn && (
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
              >
                {editingProfile ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editingProfile ? 'Cancel' : 'Edit'}
              </button>
            )}
          </div>

          {editingProfile ? (
            <form onSubmit={handleProfile(onSaveProfile)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                  <input
                    {...regProfile('firstName', { required: 'Required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {profileErrors.firstName && <p className="text-xs text-red-500 mt-1">{profileErrors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                  <input
                    {...regProfile('lastName', { required: 'Required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {profileErrors.lastName && <p className="text-xs text-red-500 mt-1">{profileErrors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                <input
                  {...regProfile('phoneNumber')}
                  className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Country</label>
                <select
                  {...regProfile('country')}
                  className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                >
                  <option value="">Select country</option>
                  {['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Other'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: User, label: 'Full Name', value: displayName || 'N/A' },
                { icon: Mail, label: 'Email', value: email || 'N/A' },
                { icon: Phone, label: 'Phone', value: credentialUser?.phoneNumber || 'Not set' },
                { icon: Globe, label: 'Country', value: credentialUser?.country || 'Not set' },
                { icon: Calendar, label: 'Member Since', value: joinDate },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl">
                  <item.icon className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-400">{item.label}</p>
                    <p className="text-sm font-medium text-neutral-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Change Password — only for credential users */}
        {!isSignedIn && (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-neutral-500" />
                <h3 className="text-lg font-semibold text-neutral-800">Change Password</h3>
              </div>
              <button
                onClick={() => setEditingPassword(!editingPassword)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
              >
                {editingPassword ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editingPassword ? 'Cancel' : 'Change'}
              </button>
            </div>

            {editingPassword && (
              <form onSubmit={handlePassword(onChangePassword)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    {...regPwd('currentPassword', { required: 'Current password is required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                    placeholder="Enter current password"
                  />
                  {pwdErrors.currentPassword && <p className="text-xs text-red-500 mt-1">{pwdErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">New Password</label>
                  <input
                    type="password"
                    {...regPwd('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'At least 8 characters' } })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                    placeholder="Enter new password"
                  />
                  {pwdErrors.newPassword && <p className="text-xs text-red-500 mt-1">{pwdErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    {...regPwd('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val) => val === newPassword || 'Passwords do not match',
                    })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                    placeholder="Confirm new password"
                  />
                  {pwdErrors.confirmPassword && <p className="text-xs text-red-500 mt-1">{pwdErrors.confirmPassword.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
