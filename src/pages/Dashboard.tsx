import React from 'react';
import { useAuthStore } from '../store/auth';
import { SummaryForm } from '../components/SummaryForm';
import { SummaryList } from '../components/SummaryList';

export function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.email}
          </h1>
          <p className="mt-2 text-gray-600">
            Create summaries of your research papers and manage them here.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            New Summary
          </h2>
          <SummaryForm />
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Summaries
          </h2>
          <SummaryList />
        </div>
      </div>
    </div>
  );
}