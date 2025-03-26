import React, { useCallback } from 'react';
import { FileUp } from 'lucide-react';
import { extractTextFromImage, extractTextFromPDF } from '../lib/textExtractor';

interface FileUploaderProps {
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
}

export function FileUploader({ onTextExtracted, onError }: FileUploaderProps) {
  const handleFile = useCallback(async (file: File) => {
    try {
      let text: string;
      
      if (file.type.startsWith('image/')) {
        text = await extractTextFromImage(file);
      } else if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else {
        throw new Error('Unsupported file type');
      }
      
      onTextExtracted(text);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process file');
    }
  }, [onTextExtracted, onError]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors"
    >
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center space-y-2"
      >
        <FileUp className="w-8 h-8 text-gray-400" />
        <div className="text-sm text-gray-600">
          Drop an image or PDF here, or click to select
        </div>
      </label>
    </div>
  );
}