import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  BookOpen,
  Loader2,
  AlertCircle,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

// Configure worker path to local public worker
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';
}

interface PdfReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fileUrl: string;
  downloadFileName: string;
  initialPage?: number;
}

export const PdfReaderModal: React.FC<PdfReaderModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  fileUrl,
  downloadFileName,
  initialPage = 1,
}) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageInput, setPageInput] = useState<string>(String(initialPage));
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState<number>(1.1);
  const [fitMode, setFitMode] = useState<'custom' | 'width'>('width');
  const [loading, setLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewerMode, setViewerMode] = useState<'interactive' | 'native'>('interactive');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRenderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  // Load PDF Document
  useEffect(() => {
    if (!isOpen || !fileUrl) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setCurrentPage(initialPage);
    setPageInput(String(initialPage));

    const loadingTask = pdfjsLib.getDocument({
      url: fileUrl,
      standardFontDataUrl: '/standard_fonts/',
    });

    loadingTask.promise
      .then((doc) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('[PDF CANVAS LOAD NOTICE - SWITCHING TO NATIVE BROWSER VIEWER]', err);
        // Automatically switch to native browser viewer so the user gets the document immediately without failing
        setViewerMode('native');
        setLoading(false);
      });

    return () => {
      isMounted = false;
      loadingTask.destroy();
    };
  }, [isOpen, fileUrl, initialPage]);

  // Render Current Page
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

      // Cancel any ongoing render
      if (activeRenderTaskRef.current) {
        try {
          activeRenderTaskRef.current.cancel();
        } catch {
          // Ignore cancellation errors
        }
      }

      setPageRendering(true);

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const container = containerRef.current;
        let targetScale = scale;

        // Auto-fit to width if set
        if (fitMode === 'width') {
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const availableWidth = container.clientWidth - 48; // padding
          if (availableWidth > 200) {
            targetScale = Math.min(2.5, Math.max(0.6, availableWidth / unscaledViewport.width));
          }
        }

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale: targetScale });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const renderContext = {
          canvasContext: ctx,
          viewport,
          canvas,
          transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
        };

        const renderTask = (page as any).render(renderContext);
        activeRenderTaskRef.current = renderTask;

        await renderTask.promise;
        activeRenderTaskRef.current = null;
        setPageRendering(false);
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('[PAGE RENDER ERROR]', err);
        }
        setPageRendering(false);
      }
    },
    [pdfDoc, scale, fitMode]
  );

  // Trigger page render when page or scale changes
  useEffect(() => {
    if (!loading && pdfDoc) {
      renderPage(currentPage);
      setPageInput(String(currentPage));
    }
  }, [loading, pdfDoc, currentPage, renderPage]);

  // Re-fit on window resize
  useEffect(() => {
    const handleResize = () => {
      if (fitMode === 'width' && pdfDoc) {
        renderPage(currentPage);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitMode, pdfDoc, currentPage, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(numPages, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          handleToggleFullscreen();
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, numPages, isFullscreen, onClose]);

  // Page navigation handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(pageInput, 10);
    if (!isNaN(p) && p >= 1 && p <= numPages) {
      setCurrentPage(p);
    } else {
      setPageInput(String(currentPage));
    }
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setFitMode('custom');
    setScale((prev) => Math.min(3.0, Math.round((prev + 0.2) * 10) / 10));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setScale((prev) => Math.max(0.5, Math.round((prev - 0.2) * 10) / 10));
  };

  const handleFitToWidth = () => {
    setFitMode('width');
    renderPage(currentPage);
  };

  const handleResetZoom = () => {
    setFitMode('custom');
    setScale(1.0);
  };

  const handleToggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document.exitFullscreen?.()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  // Direct download handler
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col bg-slate-950/95 text-slate-100 backdrop-blur-md animate-in fade-in duration-200 ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl mb-2 shrink-0 shadow-lg">
        {/* Document Info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-extrabold text-white truncate">{title}</h2>
            {subtitle && <p className="text-[10px] text-slate-400 truncate">{subtitle}</p>}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Zoom controls (desktop & tablet) */}
          {viewerMode === 'interactive' && (
            <div className="hidden sm:flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700/60 text-xs">
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.6}
                title="Zoom out"
                className="p-1.5 rounded-lg hover:bg-slate-700/70 text-slate-300 disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] font-mono font-bold text-slate-200">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={scale >= 2.8}
                title="Zoom in"
                className="p-1.5 rounded-lg hover:bg-slate-700/70 text-slate-300 disabled:opacity-40 transition cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleFitToWidth}
                title="Fit to page width"
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition cursor-pointer ${
                  fitMode === 'width' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-700/70'
                }`}
              >
                Fit
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset zoom to 100%"
                className="px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-300 hover:bg-slate-700/70 transition cursor-pointer"
              >
                100%
              </button>
            </div>
          )}

          {/* Mode Switcher: Interactive Canvas vs Native Browser Viewer */}
          <button
            onClick={() => {
              setError(null);
              setViewerMode((prev) => (prev === 'interactive' ? 'native' : 'interactive'));
            }}
            title={
              viewerMode === 'interactive'
                ? 'Switch to Browser Native PDF Engine'
                : 'Switch to Custom Interactive Reader'
            }
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/60 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">
              {viewerMode === 'interactive' ? 'Native Viewer' : 'Interactive Reader'}
            </span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownload}
            title="Download original PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            title="Close reader (Esc)"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700/60 transition cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Viewer Body: Dual-Mode (Native Browser Viewer or Interactive Canvas) */}
      {viewerMode === 'native' ? (
        <div className="flex-1 min-h-0 w-full h-full relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col p-1">
          <iframe
            src={`${fileUrl}#page=${currentPage}&toolbar=1&navpanes=1`}
            className="w-full h-full flex-1 min-h-[70vh] rounded-xl bg-white border-0 shadow-2xl"
            title={title}
          />
        </div>
      ) : (
        <div className="flex-1 min-h-0 relative overflow-auto rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center p-3 sm:p-6 custom-scrollbar">
          {loading && (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-xs font-semibold">Opening textbook &amp; rendering mathematical equations...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md p-6 rounded-2xl bg-slate-900 border border-amber-500/30 text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-white">Interactive Canvas Notice</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Your device had difficulty initializing the interactive worker. You can open the document instantly in the built-in native viewer.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setError(null);
                    setViewerMode('native');
                  }}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open in Native Viewer</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* High-DPI Crisp Canvas */}
          <canvas
            ref={canvasRef}
            className={`shadow-2xl rounded-lg transition-opacity duration-150 mx-auto ${
              loading || error ? 'hidden' : 'block'
            } ${pageRendering ? 'opacity-70' : 'opacity-100'}`}
          />

          {/* Page Rendering Overlay Indicator */}
          {pageRendering && !loading && (
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1.5 shadow-md">
              <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
              <span>Rendering...</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Navigation Toolbar (Interactive Canvas Mode) */}
      {viewerMode === 'interactive' && !loading && !error && numPages > 0 && (
        <div className="mt-2 py-2 px-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex items-center justify-between gap-2 shadow-lg shrink-0">
          {/* Jump 10 pages back (Desktop) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 10))}
              disabled={currentPage <= 1}
              title="Jump 10 pages backward"
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-[11px] disabled:opacity-30 transition cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
              <span>-10</span>
            </button>
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white disabled:opacity-30 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
          </div>

          {/* Page Counter & Direct Jump Input */}
          <form onSubmit={handleJumpToPage} className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400">Page</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={handleJumpToPage}
              className="w-12 text-center py-1 rounded-lg bg-slate-950 border border-slate-700 font-mono text-xs font-bold text-white focus:outline-hidden focus:border-indigo-500"
              aria-label="Current page number"
            />
            <span className="text-xs font-mono text-slate-400">of {numPages}</span>
          </form>

          {/* Next Page & Jump 10 pages forward */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleNextPage}
              disabled={currentPage >= numPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white disabled:opacity-30 transition cursor-pointer shadow-xs"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(numPages, prev + 10))}
              disabled={currentPage >= numPages}
              title="Jump 10 pages forward"
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-[11px] disabled:opacity-30 transition cursor-pointer"
            >
              <span>+10</span>
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
