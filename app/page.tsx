'use client';

import { useState } from 'react';
import { CVProvider } from './context/CVContext';
import CVEditor from './components/CVEditor';
import CVPreview from './components/CVPreview';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const cvElement = document.getElementById('cv-content');
    if (!cvElement) return;

    setIsGenerating(true);
    
    try {
      // Create high-resolution PNG using html-to-image
      const imgData = await toPng(cvElement, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution for crisp output
        backgroundColor: '#ffffff',
        width: 793.7, // A4 width in pixels (210mm)
        height: 1122.5, // A4 height in pixels (297mm)
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Add image to PDF (0, 0, 210mm width, 297mm height)
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      // Download the PDF
      pdf.save('my-cv.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <CVProvider>
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="header-gradient bg-white border-b border-gray-200 px-6 py-4 no-print">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CV Maker</h1>
                <p className="text-xs text-gray-500">Professional CV Builder</p>
              </div>
            </div>
            <button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Editor */}
          <div className="w-[480px] flex-shrink-0 bg-white editor-panel overflow-y-auto no-print">
            <CVEditor />
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 preview-container overflow-auto">
            <div className="p-8 flex justify-center">
              <CVPreview />
            </div>
          </div>
        </div>
      </main>
    </CVProvider>
  );
}