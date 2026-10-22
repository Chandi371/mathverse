import { describe, it, expect } from 'vitest';
import { parseUrlToState, formatStateToUrl, type RouteState } from './router';

describe('Browser History & Navigation Flow Simulation', () => {
  it('simulates user journey: Home -> Chapters -> ChapterView -> Back -> Back', () => {
    const historyStack: { state: RouteState; url: string }[] = [];
    let currentIndex = -1;

    const navigate = (state: RouteState) => {
      const url = formatStateToUrl(state);
      currentIndex++;
      historyStack.splice(currentIndex);
      historyStack.push({ state: { ...state, historyIndex: currentIndex }, url });
    };

    const back = (): RouteState | null => {
      if (currentIndex > 0) {
        currentIndex--;
        return historyStack[currentIndex].state;
      }
      return null;
    };

    const forward = (): RouteState | null => {
      if (currentIndex < historyStack.length - 1) {
        currentIndex++;
        return historyStack[currentIndex].state;
      }
      return null;
    };

    // 1. User arrives on Home page
    navigate({ tab: 'home' });
    expect(historyStack[currentIndex].url).toBe('/');
    expect(historyStack[currentIndex].state.tab).toBe('home');

    // 2. User clicks Chapters tab
    navigate({ tab: 'chapters', selectedClass: 10 });
    expect(historyStack[currentIndex].url).toBe('/chapters?class=10');
    expect(historyStack[currentIndex].state.tab).toBe('chapters');

    // 3. User selects Arithmetic Progression chapter
    navigate({ tab: 'chapter-view', chapterId: 'c10-s1-ap', selectedClass: 10 });
    expect(historyStack[currentIndex].url).toBe('/chapter/c10-s1-ap');
    expect(historyStack[currentIndex].state.tab).toBe('chapter-view');

    // 4. User clicks browser Back button (<-)
    const stateAfterBack1 = back();
    expect(stateAfterBack1).not.toBeNull();
    expect(stateAfterBack1?.tab).toBe('chapters');
    expect(historyStack[currentIndex].url).toBe('/chapters?class=10');

    // 5. User clicks browser Back button again (<-)
    const stateAfterBack2 = back();
    expect(stateAfterBack2).not.toBeNull();
    expect(stateAfterBack2?.tab).toBe('home');
    expect(historyStack[currentIndex].url).toBe('/');

    // 6. User clicks browser Forward button (->)
    const stateAfterForward1 = forward();
    expect(stateAfterForward1?.tab).toBe('chapters');

    const stateAfterForward2 = forward();
    expect(stateAfterForward2?.tab).toBe('chapter-view');
    expect(stateAfterForward2?.chapterId).toBe('c10-s1-ap');
  });

  it('simulates direct link loading and hash routing for Ramanujan Lab', () => {
    const directState = parseUrlToState('/labs/ramanujan-lab', '', '');
    expect(directState.tab).toBe('labs');
    expect(directState.labId).toBe('ramanujan-lab');

    const hashState = parseUrlToState('/', '', '#/labs/ramanujan-lab');
    expect(hashState.tab).toBe('labs');
    expect(hashState.labId).toBe('ramanujan-lab');
  });
});
