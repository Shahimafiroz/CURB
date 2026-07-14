const HISTORY_KEY = "sanctions_screening_history";

/**
  History entry obj:
  {
   id: str,
   timestamp: str,
   stats: { totalQueries, totalMatches, totalNotMatched, allMatched, noneMatched },
   entries: [{ queriedName, matchedName, matchFound, time }]
  }
 */

// getScreening History
export const getScreeningHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Save new history
export const saveScreeningToHistory = (resultantArray, stats) => {
  try {
    const now = new Date();

    const entries = resultantArray.map((item) => ({
      queriedName: item.lowerCaseName,
      matchedName: item.originalName ?? null,
      matchFound: item.matchFound,
      time: now.toLocaleTimeString(),
    }));

    const newSession = {
      id: now.getTime().toString(), // unique id = epoch ms
      timestamp: now.toISOString(),
      displayTime: now.toLocaleString(),
      stats,
      entries,
    };

    const existing = getScreeningHistory();
    const updated = [newSession, ...existing]; // newest first

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    alert("Failed to save screening history to localStorage");
    return [];
  }
};

// Clear All history

export const clearScreeningHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    alert("Failed to clear screening history");
  }
};
