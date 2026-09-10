import React from 'react';

// Base App component
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 max-w-md">
        <h1 className="text-3xl font-bold text-indigo-400 mb-4">Employee Management System</h1>
        <p className="text-slate-300 mb-6">
          Full-Stack Application initialized with Node.js, TypeORM, MySQL, and React.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
          System Ready
        </div>
      </div>
    </div>
  );
}
