import { useState, useRef } from 'react';
import { useCards } from '../hooks/useCards';
import { exportData, importData, mergeReviewData, downloadJson } from '../utils/exportImport';
import { saveReviewData } from '../utils/localStorage';

export function SettingsPage() {
  const { state, dispatch } = useCards();
  const { reviewData, sessionStats } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [confirmReset, setConfirmReset] = useState(false);

  const totalReviewed = Object.values(reviewData).reduce((sum, r) => sum + r.reviewCount, 0);
  const totalGotIt = Object.values(reviewData).reduce((sum, r) => sum + r.gotItCount, 0);
  const overallAccuracy = totalReviewed > 0 ? Math.round((totalGotIt / totalReviewed) * 100) : 0;

  function handleExport() {
    const json = exportData(reviewData);
    const date = new Date().toISOString().slice(0, 10);
    downloadJson(json, `de-flashcards-backup-${date}.json`);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imported = importData(reader.result as string);
      if (!imported) {
        setImportStatus('error');
        return;
      }
      const merged = mergeReviewData(reviewData, imported);
      saveReviewData(merged);
      // Reload to pick up new data
      window.location.reload();
    };
    reader.readAsText(file);
  }

  function handleReset() {
    saveReviewData({});
    dispatch({ type: 'RESET_SESSION' });
    window.location.reload();
  }

  return (
    <div className="py-6 px-4 md:py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-display text-text-primary mb-6">Settings</h2>

      {/* Stats overview */}
      <div className="rounded-2xl bg-surface-card border border-border p-5 mb-6">
        <h3 className="text-sm font-semibold text-text-secondary mb-3">Progress Overview</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-display text-text-primary">{totalReviewed}</p>
            <p className="text-xs text-text-muted">Total Reviews</p>
          </div>
          <div>
            <p className="text-2xl font-display text-success">{overallAccuracy}%</p>
            <p className="text-xs text-text-muted">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-display text-accent">{sessionStats.bestStreak}</p>
            <p className="text-xs text-text-muted">Best Streak</p>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="rounded-2xl bg-surface-card border border-border p-5 mb-4">
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Export Progress</h3>
        <p className="text-xs text-text-muted mb-3">Download your review data as a JSON file.</p>
        <button
          onClick={handleExport}
          className="w-full py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-light active:scale-95 transition-all"
        >
          Export Data
        </button>
      </div>

      {/* Import */}
      <div className="rounded-2xl bg-surface-card border border-border p-5 mb-4">
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Import Progress</h3>
        <p className="text-xs text-text-muted mb-3">Import a previously exported JSON file. Newer data wins on conflicts.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2.5 rounded-xl bg-surface-elevated border border-border text-text-primary font-medium text-sm hover:bg-border active:scale-95 transition-all"
        >
          Choose File
        </button>
        {importStatus === 'error' && (
          <p className="text-red-500 text-xs mt-2">Invalid file format. Please use a valid export file.</p>
        )}
      </div>

      {/* Reset */}
      <div className="rounded-2xl bg-surface-card border border-red-500/20 p-5">
        <h3 className="text-sm font-semibold text-red-500 mb-2">Reset All Progress</h3>
        <p className="text-xs text-text-muted mb-3">This permanently deletes all review data. This cannot be undone.</p>
        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 font-medium text-sm hover:bg-red-500/15 active:scale-95 transition-all"
          >
            Reset Progress
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 py-2.5 rounded-xl bg-surface-elevated border border-border text-text-secondary font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm active:scale-95 transition-all"
            >
              Confirm Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
