export default function FeedSearchBar({
  value,
  onChange,
  onClear,
  totalCount,
  resultsCount,
}) {
  const hasQuery = String(value || '').trim().length > 0

  return (
    <div className="feed-search">
      <label className="feed-search__label" htmlFor="feed-search-input">
        Recherche
      </label>
      <div className="feed-search__controls">
        <input
          id="feed-search-input"
          type="search"
          placeholder="Filtrer par titre, auteur ou contenu"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          aria-label="Filtrer les posts"
        />
        {hasQuery ? (
          <button type="button" className="btn ghost feed-search__clear" onClick={onClear}>
            Effacer
          </button>
        ) : null}
      </div>
      <div className="feed-search__meta">
        <span>{totalCount} posts</span>
        {hasQuery ? <span>{resultsCount} résultat(s)</span> : null}
      </div>
    </div>
  )
}
