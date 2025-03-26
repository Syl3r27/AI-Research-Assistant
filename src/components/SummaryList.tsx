import React, { useEffect } from 'react';
import { FileText, Trash2, Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useSummariesStore } from '../store/summaries';

export function SummaryList() {
  const { summaries, loading, error, fetchSummaries, deleteSummary } = useSummariesStore();

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  const handleExport = (summary: any) => {
    const content = `Title: ${summary.title}\n\nOriginal Text:\n${summary.original_text}\n\nSummary:\n${summary.summary || 'No summary generated yet'}\n\nHighlights:\n${summary.highlights.join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${summary.title}.txt`);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">{error}</div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No summaries yet. Create your first one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {summaries.map((summary) => (
        <div
          key={summary.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-medium text-gray-900">
                {summary.title}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleExport(summary)}
                className="text-gray-400 hover:text-indigo-600"
                title="Export summary"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteSummary(summary.id)}
                className="text-gray-400 hover:text-red-600"
                title="Delete summary"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="text-sm text-gray-500">
              Original Text:
              <p className="mt-1 text-gray-700 line-clamp-3">
                {summary.original_text}
              </p>
            </div>
            
            {summary.summary && (
              <div className="text-sm text-gray-500">
                Summary:
                <p className="mt-1 text-gray-700">
                  {summary.summary}
                </p>
              </div>
            )}
            
            <div className="text-xs text-gray-400">
              Created: {new Date(summary.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}