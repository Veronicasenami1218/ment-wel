import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserPlus, MoreVertical, CheckCircle, XCircle, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string; name: string; email: string; role: string; status: string; joined: string
}

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Amara Osei', email: 'amara@example.com', role: 'User', status: 'Active', joined: 'Jan 12, 2025' },
  { id: '2', name: 'Chidi Nwosu', email: 'chidi@example.com', role: 'User', status: 'Active', joined: 'Jan 15, 2025' },
  { id: '3', name: 'Fatima Hassan', email: 'fatima@example.com', role: 'Counselor', status: 'Active', joined: 'Feb 3, 2025' },
  { id: '4', name: 'Tunde Adeyemi', email: 'tunde@example.com', role: 'User', status: 'Inactive', joined: 'Feb 10, 2025' },
  { id: '5', name: 'Ngozi Eze', email: 'ngozi@example.com', role: 'User', status: 'Active', joined: 'Mar 1, 2025' },
  { id: '6', name: 'Kwame Asante', email: 'kwame@example.com', role: 'Counselor', status: 'Active', joined: 'Mar 5, 2025' },
  { id: '7', name: 'Bola Adesanya', email: 'bola@example.com', role: 'User', status: 'Active', joined: 'Mar 20, 2025' },
  { id: '8', name: 'Emeka Obi', email: 'emeka@example.com', role: 'User', status: 'Inactive', joined: 'Apr 2, 2025' },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u))
    toast.success('User status updated')
    setOpenMenu(null)
  }

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    toast.success('User removed')
    setOpenMenu(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Users</h1>
          <p className="text-neutral-500 text-sm mt-1">{users.length} total users</p>
        </div>
        <button
          onClick={() => toast('Add user form coming soon')}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl text-sm font-medium hover:shadow-md transition-all"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-4 border-b border-neutral-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-violet-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.name[0]}
                      </div>
                      <span className="font-medium text-neutral-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === 'Counselor' ? 'bg-purple-50 text-purple-600' : 'bg-sky-50 text-sky-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-neutral-400">{user.joined}</td>
                  <td className="px-6 py-3 relative">
                    <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                      className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-neutral-500" />
                    </button>
                    {openMenu === user.id && (
                      <div className="absolute right-6 top-10 bg-white rounded-xl shadow-lg border border-neutral-200 z-10 py-1 min-w-[160px]">
                        <button onClick={() => toggleStatus(user.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 w-full text-left">
                          {user.status === 'Active'
                            ? <><XCircle className="w-4 h-4 text-amber-500" /> Deactivate</>
                            : <><CheckCircle className="w-4 h-4 text-green-500" /> Activate</>
                          }
                        </button>
                        <button onClick={() => deleteUser(user.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-400">
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
