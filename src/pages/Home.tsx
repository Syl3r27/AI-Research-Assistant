import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, FileText, Users } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Content Summarization',
      description: 'Generate concise summaries of research papers instantly',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Advanced Search',
      description: 'Search across multiple academic databases with natural language',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Citation Management',
      description: 'Automatically generate and manage citations in multiple formats',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaboration',
      description: 'Work together with team members in real-time',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Your AI Research Assistant
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Streamline your research process with AI-powered tools for summarization,
          search, and collaboration.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <Link
            to="/auth"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-indigo-600">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}