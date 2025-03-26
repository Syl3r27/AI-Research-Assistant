import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useSummariesStore } from '../store/summaries';
import { FileUploader } from './FileUploader';

export function SummaryForm() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { createSummary, loading, error: storeError } = useSummariesStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSummary(title, text);
      setTitle('');
      setText('');
      setError(null);
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${title || 'summary'}.txt`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <FileUploader
        onTextExtracted={setText}
        onError={setError}
      />

      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Text to Summarize
        </label>
        <div className="relative">
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          {text && (
            <button
              type="button"
              onClick={handleExport}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-indigo-600"
              title="Export text"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {(error || storeError) && (
        <div className="text-red-600 text-sm">{error || storeError}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Generate Summary'}
      </button>
    </form>
  );
}