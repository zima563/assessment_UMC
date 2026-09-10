import { useEffect, useState } from 'react';
import { getDashboardStatsApi } from '../api/dashboard.api';
import { DashboardMetrics } from '../types';
import { Users, Building2, UserPlus, TrendingUp, Calendar, Mail } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const data = await getDashboardStatsApi();
        setMetrics(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Overview of system metrics, department distribution, and recent hires.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* KPI: Total Employees */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Employees</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.totalEmployees || 0}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-400 font-medium space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active Workforce</span>
          </div>
        </div>

        {/* KPI: Total Departments */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Departments</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.totalDepartments || 0}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400 font-medium">
            Managed Teams & Units
          </div>
        </div>

        {/* KPI: Recent Hires Count */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Recent Hires</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">{metrics?.recentHires.length || 0}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400 font-medium">
            Latest Team Additions
          </div>
        </div>
      </div>

      {/* Analytics Section: Department Distribution & Recent Hires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Distribution Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-400" />
              Department Distribution
            </h2>
            <p className="text-xs text-slate-400 mt-1">Breakdown of employee allocation per department</p>
          </div>

          {metrics?.departmentDistribution && metrics.departmentDistribution.length > 0 ? (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.departmentDistribution}>
                  <XAxis dataKey="departmentName" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="employeeCount" radius={[8, 8, 0, 0]}>
                    {metrics.departmentDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-slate-500 py-12 text-center">No department distribution data available.</p>
          )}
        </div>

        {/* Recent Hires Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                Recent Hires
              </h2>
              <p className="text-xs text-slate-400 mt-1">Most recently onboarded employees</p>
            </div>

            {metrics?.recentHires && metrics.recentHires.length > 0 ? (
              <div className="space-y-3">
                {metrics.recentHires.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-sm">
                        {emp.firstName.charAt(0)}
                        {emp.lastName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {emp.firstName} {emp.lastName}
                        </h4>
                        <div className="flex items-center text-xs text-slate-400 space-x-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-500" />
                            {emp.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {emp.department?.name || 'Unassigned'}
                      </span>
                      <p className="text-xs text-slate-500 flex items-center gap-1 justify-end mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(emp.hireDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 py-12 text-center">No recent hires found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
