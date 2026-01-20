'use client';

import { useState, useRef } from 'react';
import { CVProvider } from './context/CVContext';
import CVEditor from './components/CVEditor';
import CVPreview from './components/CVPreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const [zoom, setZoom] = useState(0.75);
  const [isGenerating, setIsGenerating] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const handleZoomReset = () => setZoom(0.75);

  const handleDownloadPDF = async () => {
    const cvElement = document.getElementById('cv-content');
    if (!cvElement) return;

    setIsGenerating(true);
    
    try {
      // Create canvas from the CV element
      const canvas = await html2canvas(cvElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        windowWidth: 794,
        windowHeight: 1123,
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      
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
            <div className="flex items-center gap-4">
              {/* Zoom Controls */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={handleZoomOut}
                  className="p-1.5 hover:bg-white rounded-md transition-colors"
                  title="Zoom out"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button 
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-white rounded-md transition-colors min-w-[50px]"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button 
                  onClick={handleZoomIn}
                  className="p-1.5 hover:bg-white rounded-md transition-colors"
                  title="Zoom in"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 text-sm font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Editor */}
          <div className="w-[480px] flex-shrink-0 bg-white editor-panel overflow-y-auto no-print">
            <CVEditor />
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 preview-container overflow-auto relative">
            <div className="p-8 flex justify-center">
              <div 
                className="cv-preview-wrapper"
                style={{ transform: `scale(${zoom})` }}
              >
                <CVPreview />
              </div>
            </div>
            
            {/* Floating Zoom Controls */}
            <div className="fixed bottom-6 right-6 no-print zoom-controls rounded-xl shadow-2xl p-2 flex items-center gap-1">
              <button 
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom out"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>
              <span className="px-3 py-1 text-sm font-semibold text-gray-700 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button 
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Zoom in"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>
              <div className="w-px h-6 bg-gray-300 mx-1"></div>
              <button 
                onClick={handleZoomReset}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Reset zoom"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </CVProvider>
  );
}
