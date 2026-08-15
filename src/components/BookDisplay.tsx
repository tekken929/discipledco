import { useState } from 'react';
import { Book } from '../types/book';
import { BookOpen, Calendar, Clock, User, BookMarked, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface BookDisplayProps {
  book: Book;
}

const sectionColors = [
  '#2FA4A9', // Teal
  '#3B82F6', // Blue
  '#F59E0B', // Orange
  '#EF4444', // Red
  '#22C55E', // Green
  '#374151', // Dark Gray
];

export function BookDisplay({ book }: BookDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([1, 2]));

  const handlePrint = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${book.name} — The Disciple Co.</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #ffffff;
      color: #111827;
      padding: 40px;
      padding-top: 88px;
      max-width: 820px;
      margin: 0 auto;
    }
    h1 { font-size: 2.4rem; font-weight: 800; margin-bottom: 24px; color: #111827; }
    h2 { font-size: 1.4rem; font-weight: 700; margin-bottom: 16px; color: #111827; display: flex; align-items: center; gap: 8px; }
    .meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
    .meta-card { border-radius: 12px; padding: 14px 16px; border: 1px solid; }
    .meta-label { font-size: 0.72rem; font-weight: 600; margin-bottom: 4px; }
    .meta-value { font-size: 1.2rem; font-weight: 700; }
    .meta-sub { font-size: 0.72rem; margin-top: 5px; line-height: 1.5; }
    .overview { margin-bottom: 32px; }
    .overview p { color: #374151; line-height: 1.75; margin-bottom: 12px; font-size: 0.95rem; }
    .section-card { border-radius: 12px; border: 2px solid; margin-bottom: 16px; overflow: hidden; page-break-inside: avoid; }
    .section-bar { height: 6px; }
    .section-body { padding: 18px 22px; }
    .section-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
    .section-num { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1rem; font-weight: 800; flex-shrink: 0; }
    .section-title-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .section-title { font-size: 1.05rem; font-weight: 700; color: #111827; }
    .chapter-range { padding: 2px 11px; background: #f3f4f6; color: #374151; border-radius: 999px; font-size: 0.78rem; font-weight: 600; }
    .section-summary { color: #374151; line-height: 1.65; margin-bottom: 12px; margin-left: 56px; font-size: 0.9rem; }
    .key-verse { margin-left: 56px; padding: 11px 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid; }
    .key-verse-text { font-style: italic; color: #374151; margin-bottom: 4px; font-size: 0.88rem; }
    .key-verse-ref { font-size: 0.73rem; font-weight: 600; color: #6b7280; }
    .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 0.75rem; color: #9ca3af; }
    /* Toolbar */
    .toolbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 56px;
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      z-index: 100;
    }
    .toolbar-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #6b7280;
      letter-spacing: 0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .toolbar-actions { display: flex; gap: 10px; flex-shrink: 0; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 0.15s, transform 0.1s;
    }
    .btn:active { transform: scale(0.97); }
    .btn-save {
      background: #0f766e;
      color: #ffffff;
    }
    .btn-save:hover { opacity: 0.88; }
    .btn-print {
      background: #f3f4f6;
      color: #111827;
      border: 1px solid #d1d5db;
    }
    .btn-print:hover { background: #e5e7eb; }
    .btn-close {
      background: #f3f4f6;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }
    .btn-close:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }
    @page { margin: 0; }
    @media print {
      .toolbar { display: none; }
      body { padding: 20px 40px; }
      .section-card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <span class="toolbar-title">${book.name} — The Disciple Co.</span>
    <div class="toolbar-actions">
      <button class="btn btn-save" onclick="window.print()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Save as PDF
      </button>
      <button class="btn btn-print" onclick="window.print()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print
      </button>
      <button class="btn btn-close" onclick="window.close()">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        Close
      </button>
    </div>
  </div>

  <h1>${book.name}</h1>

  <div class="meta-grid">
    <div class="meta-card" style="background:#eff6ff;border-color:#bfdbfe;">
      <div class="meta-label" style="color:#1d4ed8;">Book Order</div>
      <div class="meta-value" style="color:#1e3a8a;">#${book.order}</div>
    </div>
    <div class="meta-card" style="background:#f0fdf4;border-color:#bbf7d0;">
      <div class="meta-label" style="color:#15803d;">Chapters</div>
      <div class="meta-value" style="color:#14532d;">${book.chapters}</div>
    </div>
    <div class="meta-card" style="background:#fff7ed;border-color:#fed7aa;">
      <div class="meta-label" style="color:#c2410c;">Type</div>
      <div class="meta-value" style="color:#7c2d12;font-size:1rem;">${book.type}</div>
    </div>
    <div class="meta-card" style="background:#faf5ff;border-color:#e9d5ff;">
      <div class="meta-label" style="color:#7e22ce;">Written</div>
      <div class="meta-value" style="color:#3b0764;font-size:1rem;">${book.written}</div>
    </div>
    <div class="meta-card" style="background:#f0fdfa;border-color:#99f6e4;">
      <div class="meta-label" style="color:#0f766e;">Time Period</div>
      <div class="meta-value" style="color:#134e4a;font-size:1rem;">${book.timePeriod}</div>
    </div>
    <div class="meta-card" style="background:#fff1f2;border-color:#fecdd3;">
      <div class="meta-label" style="color:#be123c;">Author</div>
      <div class="meta-value" style="color:#881337;font-size:0.95rem;">${book.author}</div>
      <div class="meta-sub" style="color:#9f1239;">${book.authorDescription}</div>
    </div>
  </div>

  <div class="overview">
    <h2>Overview</h2>
    ${book.overview.map(p => `<p>${p}</p>`).join('\n    ')}
  </div>

  <h2>Content</h2>
  ${book.structure.map((section) => {
    const color = sectionColors[(section.number - 1) % sectionColors.length];
    return `<div class="section-card" style="border-color:${color};">
    <div class="section-bar" style="background:${color};"></div>
    <div class="section-body">
      <div class="section-header">
        <div class="section-num" style="background:${color};">${section.number}</div>
        <div class="section-title-row">
          <span class="section-title">${section.title}</span>
          <span class="chapter-range">Ch. ${section.chapterRange}</span>
        </div>
      </div>
      ${section.summary ? `<p class="section-summary">${section.summary}</p>` : ''}
      ${section.keyVerse ? `<div class="key-verse" style="border-color:${color};">
        <p class="key-verse-text">"${section.keyVerse}"</p>
        <p class="key-verse-ref">— ${section.verseReference}</p>
      </div>` : ''}
    </div>
  </div>`;
  }).join('\n  ')}

  <div class="footer">The Disciple Co. &nbsp;·&nbsp; thediscipleco.org</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  const toggleSection = (sectionNumber: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionNumber)) {
      newExpanded.delete(sectionNumber);
    } else {
      newExpanded.add(sectionNumber);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="max-w-5xl mx-auto theme-card rounded-2xl shadow-xl p-5 md:p-8 transition-colors">
      {/* Header Section */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">{book.name}</h1>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 theme-primary-button text-white font-semibold px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Download/Save PDF</span>
            <span className="sm:hidden text-sm">Save PDF</span>
          </button>
        </div>

        {/* Compact meta strip */}
        <div className="grid grid-cols-5 gap-2">
          <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg px-3 py-2 border border-blue-200 dark:border-blue-700">
            <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Order</div>
            <div className="text-base font-bold text-blue-900 dark:text-blue-100">#{book.order}</div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/40 rounded-lg px-3 py-2 border border-green-200 dark:border-green-700">
            <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">Chapters</div>
            <div className="text-base font-bold text-green-900 dark:text-green-100">{book.chapters}</div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/40 rounded-lg px-3 py-2 border border-orange-200 dark:border-orange-700">
            <div className="text-[10px] font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wide">Type</div>
            <div className="text-sm font-bold text-orange-900 dark:text-orange-100 leading-tight">{book.type}</div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/40 rounded-lg px-3 py-2 border border-purple-200 dark:border-purple-700">
            <div className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide">Written</div>
            <div className="text-sm font-bold text-purple-900 dark:text-purple-100 leading-tight">{book.written}</div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/40 rounded-lg px-3 py-2 border border-teal-200 dark:border-teal-700">
            <div className="text-[10px] font-semibold text-teal-700 dark:text-teal-300 uppercase tracking-wide">Period</div>
            <div className="text-sm font-bold text-teal-900 dark:text-teal-100 leading-tight">{book.timePeriod}</div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/40 rounded-lg px-3 py-2 border border-rose-200 dark:border-rose-700 col-span-5">
            <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wide">Author</div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
              <span className="text-sm font-bold text-rose-900 dark:text-rose-100 leading-tight whitespace-nowrap">{book.author}</span>
              {book.authorDescription && (
                <span className="text-xs text-rose-800/80 dark:text-rose-200/70 leading-relaxed">{book.authorDescription}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Overview
        </h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          {book.overview.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Content</h2>

        <div className="grid gap-3">
          {book.structure.map((section) => {
            const isExpanded = expandedSections.has(section.number);
            return (
              <div
                key={section.number}
                className="bg-white dark:bg-gray-700 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all overflow-hidden"
                style={{ borderColor: sectionColors[section.number - 1] }}
              >
                <button
                  onClick={() => toggleSection(section.number)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: sectionColors[section.number - 1] }}
                      >
                        {section.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white">{section.title}</h3>
                          <span className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full text-xs font-semibold">
                            Ch. {section.chapterRange}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-3 pt-0">
                    <div className="pl-11">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{section.summary}</p>
                      <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-2.5 border-l-4" style={{ borderColor: sectionColors[section.number - 1] }}>
                        <p className="text-sm italic text-gray-700 dark:text-gray-200 mb-1">"{section.keyVerse}"</p>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">— {section.verseReference}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
