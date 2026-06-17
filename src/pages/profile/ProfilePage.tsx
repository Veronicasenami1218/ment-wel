import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import { User, Mail, Phone, Globe, Calendar, Edit2, KeyRound, Save, X, Camera, Loader2, Trash2 } from 'lucide-react'
import apiClient from '../../config/api'

interface ProfileFormData {
  firstName: string
  lastName: string
  phoneNumber: string
}

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { user: credentialUser, updateUser } = useAuth()
  const { isSignedIn } = useClerkAuth()
  const { user: clerkUser } = useUser()

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingPassword, setEditingPassword] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [uploadingPicture, setUploadingPicture] = useState(false)

  const activeUser = isSignedIn ? clerkUser : credentialUser

  // The active profile picture comes from either Clerk's `imageUrl` (for OAuth
  // users) or the credential user's persisted `profilePicture` (base64 data
  // URL stored in localStorage via useAuth.updateUser).
  const profilePicture: string | null =
    (isSignedIn ? (clerkUser as any)?.imageUrl : credentialUser?.profilePicture) || null

  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } =
    useForm<ProfileFormData>({
      defaultValues: {
        firstName: (activeUser as any)?.firstName || (activeUser as any)?.first_name || '',
        lastName: (activeUser as any)?.lastName || (activeUser as any)?.last_name || '',
        phoneNumber: (credentialUser as any)?.phoneNumber || '',
      },
    })

  const { register: regPwd, handleSubmit: handlePassword, watch, reset: resetPwd, formState: { errors: pwdErrors } } =
    useForm<PasswordFormData>()

  const newPassword = watch('newPassword')

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB')
      return
    }

    setUploadingPicture(true)
    try {
      // Read the image as a base64 data URL so we can persist it in
      // localStorage (and continue to render it offline / after reload).
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => resolve(e.target?.result as string)
        reader.onerror = () => reject(new Error('read-failed'))
        reader.readAsDataURL(file)
      })

      // Persist immediately so the avatar updates everywhere (Header,
      // Dashboard, Profile) and survives a full page reload.
      updateUser({ profilePicture: dataUrl })

      // Best-effort upload to the backend so other devices eventually get it.
      try {
        const fd = new FormData()
        fd.append('profilePicture', file)
        await apiClient.post('/users/profile-picture', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } catch {
        // Backend not wired yet — local copy is already saved.
      }

      toast.success('Profile picture updated')
    } catch {
      toast.error('Failed to upload profile picture')
    } finally {
      setUploadingPicture(false)
      // Reset the input so re-selecting the same file re-fires onChange
      event.target.value = ''
    }
  }

  const handleRemovePicture = () => {
    updateUser({ profilePicture: undefined })
    toast.success('Profile picture removed')
  }

  const onSaveProfile = async (data: ProfileFormData) => {
    setSavingProfile(true)
    // Optimistic local update — keeps the UI consistent even if the API call
    // below fails (e.g. backend offline). The next successful login will
    // hydrate the canonical server values.
    updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber || undefined,
    })
    try {
      await apiClient.put('/users/profile', data)
      toast.success('Profile updated successfully')
      setEditingProfile(false)
    } catch (error: any) {
      // Local copy is already saved; surface the server message but don't
      // revert the optimistic change — that would be more confusing than
      // helpful when the backend is genuinely unreachable.
      const msg = error.response?.data?.message
      toast.success('Profile saved locally' + (msg ? ` (server: ${msg})` : ''))
      setEditingProfile(false)
    } finally {
      setSavingProfile(false)
    }
  }

  const onChangePassword = async (data: PasswordFormData) => {
    setSavingPassword(true)
    try {
      await apiClient.post('/users/change-password', {
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {/* Avatar holder */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-700">
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt={displayName || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the stored image fails, fall back to initials by
                        // wiping the local copy.
                        if (!isSignedIn) updateUser({ profilePicture: undefined })
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-500 to-fuchsia-600 flex items-center justify-center text-white text-3xl font-bold">
                      {displayName ? displayName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>

                {/* Upload overlay — credential users only (Clerk owns its own picture) */}
                {!isSignedIn && (
                  <label
                    className="absolute inset-0 w-20 h-20 rounded-full bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Change profile picture"
                  >
                    {uploadingPicture ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      disabled={uploadingPicture}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">{displayName || 'User'}</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{email}</p>
                {!isSignedIn && (
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-sky-500">Hover avatar to change photo</span>
                    {profilePicture && (
                      <button
                        type="button"
                        onClick={handleRemovePicture}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {!isSignedIn && (
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
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
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">First Name</label>
                  <input
                    {...regProfile('firstName', { required: 'Required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {profileErrors.firstName && <p className="text-xs text-red-500 mt-1">{profileErrors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Last Name</label>
                  <input
                    {...regProfile('lastName', { required: 'Required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  />
                  {profileErrors.lastName && <p className="text-xs text-red-500 mt-1">{profileErrors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                <input
                  {...regProfile('phoneNumber')}
                  className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                  placeholder="+234 XXX XXX XXXX"
                />
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
                { icon: Calendar, label: 'Member Since', value: joinDate },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-xl">
                  <item.icon className="w-4 h-4 text-neutral-400 dark:text-neutral-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">{item.label}</p>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Change Password — only for credential users */}
        {!isSignedIn && (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Change Password</h3>
              </div>
              <button
                onClick={() => setEditingPassword(!editingPassword)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
              >
                {editingPassword ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editingPassword ? 'Cancel' : 'Change'}
              </button>
            </div>

            {editingPassword && (
              <form onSubmit={handlePassword(onChangePassword)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    {...regPwd('currentPassword', { required: 'Current password is required' })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                    placeholder="Enter current password"
                  />
                  {pwdErrors.currentPassword && <p className="text-xs text-red-500 mt-1">{pwdErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">New Password</label>
                  <input
                    type="password"
                    {...regPwd('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'At least 8 characters' } })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
                    placeholder="Enter new password"
                  />
                  {pwdErrors.newPassword && <p className="text-xs text-red-500 mt-1">{pwdErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    {...regPwd('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val) => val === newPassword || 'Passwords do not match',
                    })}
                    className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 dark:text-neutral-100 rounded-lg focus:outline-none focus:border-sky-500 transition-all"
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
