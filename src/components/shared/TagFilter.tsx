interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}

export function TagFilter({ tags, activeTags, onToggle, onClear }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <button
        onClick={onClear}
        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
          activeTags.length === 0
            ? 'bg-primary/10 text-primary'
            : 'bg-surface-elevated text-text-muted hover:text-text-secondary'
        }`}
      >
        All
      </button>
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-primary/10 text-primary'
                : 'bg-surface-elevated text-text-muted hover:text-text-secondary'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
