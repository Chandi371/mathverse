export interface RouteState {
  tab: string;
  chapterId?: string;
  labId?: string;
  formulaId?: string | null;
  selectedClass?: 9 | 10 | null;
  modal?: 'search' | 'auth' | null;
  historyIndex?: number;
}

export function parseUrlToState(pathname: string, search: string, hash: string): RouteState {
  // 1. Support hash-based paths (e.g. /#/chapter/c10-s1-ap or #/labs/ramanujan-lab)
  let path = pathname || '/';
  let query = search || '';

  if (hash && hash.length > 1) {
    const rawHash = hash.replace(/^#/, '');
    const [hashPath, hashSearch] = rawHash.split('?');
    if (hashPath && hashPath.startsWith('/')) {
      path = hashPath;
      if (hashSearch) query = `?${hashSearch}`;
    } else if (hashPath) {
      path = `/${hashPath}`;
      if (hashSearch) query = `?${hashSearch}`;
    }
  }

  // Normalize path: strip trailing slash except for root '/'
  const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  // Parse query parameters
  const params = new URLSearchParams(query);
  const classParam = params.get('class');
  const selectedClass: 9 | 10 | null = classParam === '9' ? 9 : classParam === '10' ? 10 : null;

  // 2. Match known routes
  if (normalizedPath === '' || normalizedPath === '/') {
    return { tab: 'home', selectedClass };
  }

  if (normalizedPath === '/chapters') {
    return { tab: 'chapters', selectedClass };
  }

  if (normalizedPath.startsWith('/chapter/')) {
    const chapterId = decodeURIComponent(normalizedPath.replace('/chapter/', '').trim());
    return {
      tab: 'chapter-view',
      chapterId: chapterId || 'c10-s1-ap',
      selectedClass,
    };
  }

  if (normalizedPath === '/labs') {
    return { tab: 'labs' };
  }

  if (normalizedPath.startsWith('/labs/')) {
    const labId = decodeURIComponent(normalizedPath.replace('/labs/', '').trim());
    return {
      tab: 'labs',
      labId: labId || 'area-model',
    };
  }

  if (normalizedPath === '/formulas') {
    return { tab: 'formulas' };
  }

  if (normalizedPath.startsWith('/formulas/')) {
    const formulaId = decodeURIComponent(normalizedPath.replace('/formulas/', '').trim());
    return {
      tab: 'formulas',
      formulaId: formulaId || null,
    };
  }

  if (normalizedPath === '/practice') {
    return { tab: 'practice' };
  }

  if (normalizedPath === '/resources') {
    return { tab: 'resources', selectedClass };
  }

  if (normalizedPath === '/progress') {
    return { tab: 'progress' };
  }

  // Fallback to home
  return { tab: 'home', selectedClass };
}

export function formatStateToUrl(state: RouteState): string {
  const classQuery = state.selectedClass ? `?class=${state.selectedClass}` : '';

  switch (state.tab) {
    case 'home':
      return `/${classQuery}`;
    case 'chapters':
      return `/chapters${classQuery}`;
    case 'chapter-view':
      return `/chapter/${encodeURIComponent(state.chapterId || 'c10-s1-ap')}`;
    case 'labs':
      return state.labId ? `/labs/${encodeURIComponent(state.labId)}` : '/labs';
    case 'formulas':
      return state.formulaId ? `/formulas/${encodeURIComponent(state.formulaId)}` : '/formulas';
    case 'practice':
      return '/practice';
    case 'resources':
      return `/resources${classQuery}`;
    case 'progress':
      return '/progress';
    default:
      return `/${classQuery}`;
  }
}

export function areStatesEqual(a: RouteState, b: RouteState): boolean {
  return (
    a.tab === b.tab &&
    (a.chapterId || null) === (b.chapterId || null) &&
    (a.labId || null) === (b.labId || null) &&
    (a.formulaId || null) === (b.formulaId || null) &&
    (a.selectedClass ?? null) === (b.selectedClass ?? null) &&
    (a.modal ?? null) === (b.modal ?? null)
  );
}
