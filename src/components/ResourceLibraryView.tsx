import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Eye,
  FileText,
  GraduationCap,
  ShieldCheck,
  Calendar,
  Award,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import {
  officialTextbooks,
  class10BoardExamResources,
  officialChapterWeightage,
  examPaperSections,
  parakhCompetencyDomains,
} from '../data/textbooksData';
import { PdfReaderModal } from './PdfReaderModal';

interface ResourceLibraryViewProps {
  selectedClassFilter: 9 | 10 | null;
  onSelectClassFilter?: (grade: 9 | 10 | null) => void;
}

export const ResourceLibraryView: React.FC<ResourceLibraryViewProps> = ({
  selectedClassFilter,
  onSelectClassFilter,
}) => {
  const [activeClassTab, setActiveClassTab] = useState<'all' | 9 | 10>(
    selectedClassFilter || 'all'
  );
  const [selectedSemester, setSelectedSemester] = useState<'all' | 1 | 2>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showWeightageTable, setShowWeightageTable] = useState<boolean>(true);

  // Active PDF Reader state
  const [activePdf, setActivePdf] = useState<{
    title: string;
    subtitle?: string;
    fileUrl: string;
    downloadFileName: string;
  } | null>(null);

  // Keep in sync with prop if user toggles header grade filter
  React.useEffect(() => {
    setActiveClassTab(selectedClassFilter || 'all');
  }, [selectedClassFilter]);

  // Filter textbooks
  const filteredTextbooks = officialTextbooks.filter((tb) => {
    if (activeClassTab !== 'all' && tb.classGrade !== activeClassTab) return false;
    if (selectedSemester !== 'all' && tb.semester !== selectedSemester) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = tb.title.toLowerCase().includes(q);
      const matchChapters = tb.chapters.some((ch) => ch.toLowerCase().includes(q));
      if (!matchTitle && !matchChapters) return false;
    }
    return true;
  });

  // Filtered Board Exam resources (Strictly Class 10 only)
  const isClass10Eligible = activeClassTab === 'all' || activeClassTab === 10;
  const filteredBoardResources = isClass10Eligible
    ? class10BoardExamResources.filter((res) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            res.title.toLowerCase().includes(q) ||
            res.subtitle.toLowerCase().includes(q) ||
            res.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
    : [];

  const handleOpenPdf = (
    title: string,
    fileUrl: string,
    downloadFileName: string,
    subtitle?: string
  ) => {
    setActivePdf({
      title,
      subtitle,
      fileUrl,
      downloadFileName,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-indigo-950/20 to-slate-900/60 border border-indigo-500/20 shadow-xl overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Government of Andhra Pradesh · SCERT Prescribed
            </span>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Source Documents
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Textbooks &amp; SSC Exam Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Read online or download official SCERT Bilingual textbooks for Classes 9 &amp; 10, along with the authenticated 2026-27 AP SSC Mathematics blueprint, chapter-wise marks weightage, and model examination papers.
          </p>

          {/* Quick Filters */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {/* Grade Tabs */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => {
                  setActiveClassTab('all');
                  onSelectClassFilter?.(null);
                }}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeClassTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Resources
              </button>
              <button
                onClick={() => {
                  setActiveClassTab(10);
                  onSelectClassFilter?.(10);
                }}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  activeClassTab === 10
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Class 10 (SSC)
              </button>
              <button
                onClick={() => {
                  setActiveClassTab(9);
                  onSelectClassFilter?.(9);
                }}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  activeClassTab === 9
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Class 9
              </button>
            </div>

            {/* Semester Tabs */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setSelectedSemester('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedSemester === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Both Semesters
              </button>
              <button
                onClick={() => setSelectedSemester(1)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedSemester === 1
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Semester 1
              </button>
              <button
                onClick={() => setSelectedSemester(2)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedSemester === 2
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Semester 2
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search chapters, blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900/90 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION A: CLASS 10 BOARD EXAM RESOURCES (STRICTLY FOR CLASS 10) */}
      {isClass10Eligible && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Class 10 SSC Public Board Exam Resources
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official documents issued by the Director of Government Examinations (SSC Board), Andhra Pradesh for Academic Year 2026-27 (Paper Code 15E &amp; 16E).
              </p>
            </div>
            <span className="hidden sm:inline-flex text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Academic Year 2026-27
            </span>
          </div>

          {/* Model Papers & Blueprint Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBoardResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60">
                      Paper Code: {res.paperCode} · 100 Marks
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {res.pageCount} Pages · {res.fileSizeMB}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      Academic Year {res.academicYear}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-cyan-500" />
                      English Medium (EM)
                    </span>
                  </div>
                </div>

                {/* Primary Actions: Read Online + Download */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      handleOpenPdf(res.title, res.fileUrl, res.downloadFileName, res.subtitle)
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read Online</span>
                  </button>
                  <a
                    href={res.fileUrl}
                    download={res.downloadFileName}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-indigo-500" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Chapter-Wise Weightage Breakdown Accordion */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <button
              onClick={() => setShowWeightageTable(!showWeightageTable)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Official AP SSC Mathematics Chapter-Wise Weightage (2026-27)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Source of truth: Director of Government Examinations (SSC Board), A.P. · 100 Marks Blueprint
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline">
                  {showWeightageTable ? 'Hide Table' : 'View Full Table'}
                </span>
                {showWeightageTable ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {showWeightageTable && (
              <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800">
                {/* Weightage Highlights Pill Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3">
                  {parakhCompetencyDomains.map((dom) => (
                    <div
                      key={dom.name}
                      className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-1">
                        <span>{dom.name.split(' ')[0]}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                          {dom.percentage}% ({dom.marks} Marks)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                        {dom.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Question Format Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {examPaperSections.map((sec) => (
                    <div
                      key={sec.section}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                        <span>{sec.section}</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">
                          {sec.totalMarks}M
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {sec.count} Qs × {sec.marksPerQuestion}M ({sec.estimatedTime})
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 truncate">{sec.choice}</p>
                    </div>
                  ))}
                </div>

                {/* Responsive Chapter Marks Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">S.No</th>
                        <th className="py-2.5 px-3">Chapter Name</th>
                        <th className="py-2.5 px-3">Breakdown</th>
                        <th className="py-2.5 px-3">Base Marks</th>
                        <th className="py-2.5 px-3">Choice Marks</th>
                        <th className="py-2.5 px-3">Max Marks</th>
                        <th className="py-2.5 px-3">Question Composition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {officialChapterWeightage.map((row) => (
                        <tr
                          key={row.sNo}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                        >
                          <td className="py-2 px-3 font-mono text-slate-400">{row.sNo}</td>
                          <td className="py-2 px-3 font-bold text-slate-900 dark:text-white">
                            {row.chapter}
                          </td>
                          <td className="py-2 px-3 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                            {row.marksBreakdown}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-slate-900 dark:text-white">
                            {row.baseMarks}M
                          </td>
                          <td className="py-2 px-3 font-mono text-slate-500">
                            {row.choiceMarks > 0 ? `+${row.choiceMarks}M` : '—'}
                          </td>
                          <td className="py-2 px-3 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                            {row.totalMarksWithChoice}M
                          </td>
                          <td className="py-2 px-3 text-[11px] text-slate-600 dark:text-slate-300">
                            {row.questionTypes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-100/80 dark:bg-slate-800/80 font-bold border-t border-slate-200 dark:border-slate-700">
                      <tr>
                        <td colSpan={3} className="py-2 px-3 text-right">
                          Total Marks Allocation:
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-900 dark:text-white font-extrabold">
                          100 Marks
                        </td>
                        <td className="py-2 px-3 font-mono text-slate-500">+40 Marks (Choice)</td>
                        <td className="py-2 px-3 font-mono text-emerald-600 font-extrabold">
                          140 Marks
                        </td>
                        <td className="py-2 px-3 text-[11px] text-slate-500">
                          33 Total Questions (4 Sections)
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION B: OFFICIAL TEXTBOOK LIBRARY (CLASSES 9 & 10) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Official Textbook Library
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Prescribed AP SCERT bilingual mathematics textbooks for Class 9 and Class 10 (Semesters 1 &amp; 2).
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {filteredTextbooks.length} Books Available
          </span>
        </div>

        {/* Textbooks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTextbooks.map((tb) => (
            <div
              key={tb.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                      Class {tb.classGrade} · Semester {tb.semester}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
                      Bilingual Edition
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {tb.pageCount} Pages · {tb.fileSizeMB}
                  </span>
                </div>

                {/* Title & Publisher */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {tb.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {tb.publisher} · {tb.edition}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tb.description}
                </p>

                {/* Chapters Covered Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Syllabus Units Included ({tb.chapters.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tb.chapters.map((ch) => (
                      <span
                        key={ch}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 truncate max-w-full"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Read Online + Download */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    handleOpenPdf(tb.title, tb.fileUrl, tb.downloadFileName, tb.subtitle)
                  }
                  className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read Online</span>
                </button>
                <a
                  href={tb.fileUrl}
                  download={tb.downloadFileName}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredTextbooks.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
            <p className="text-sm font-semibold">No textbooks match your current filter settings.</p>
            <button
              onClick={() => {
                setActiveClassTab('all');
                setSelectedSemester('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* In-Site PDF Reader Modal */}
      {activePdf && (
        <PdfReaderModal
          isOpen={Boolean(activePdf)}
          onClose={() => setActivePdf(null)}
          title={activePdf.title}
          subtitle={activePdf.subtitle}
          fileUrl={activePdf.fileUrl}
          downloadFileName={activePdf.downloadFileName}
        />
      )}
    </div>
  );
};
