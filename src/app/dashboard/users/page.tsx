import { Users, Search, MoreHorizontal } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">Users</h2>
          <p className="text-slate-400 mt-2 font-body">
            Manage system users and permissions.
          </p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-background border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-800/50 text-slate-200 font-heading uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-medium text-white">User {i}</td>
                <td className="px-6 py-4">Editor</td>
                <td className="px-6 py-4">
                  <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
