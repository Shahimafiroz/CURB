import { saveScreeningToHistory } from "./LocalStorageService";

///////////////////////   Parsing Functions   ////////////////////////////

// using the exact cleaning logic for throughout the project to avoid rdundant ccmparisons and execute faster exact matches

const cleanLine = (line) =>
  line
    .replace(/â€™|â€˜/g, "'") // remove single quotes
    .replace(/â€œ|â€/g, '"') // remove double quotes
    .replace(/\s+/g, " ") // remove blank spaces
    .replace(/^["']|["']$/g, "") // remove leading and trailing single/double quotes
    .replace(/[()]/g, "") //remove parentheses
    .trim(); // Final trim (IMPORTANT)

//// for fetched data  - returns Object
export const parseSanctionsTextJSON = (text) => {
  if (!text || typeof text !== "string") return [];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line, index) => {
      // ← Added index parameter
      const cleaned = cleanLine(line);
      return {
        id: index + 1, // ← Added ID (starts from 1)
        originalName: cleaned.trim(),
        lowerCaseName: cleaned.toLowerCase().trim(),
      };
    });
};

// Normal Array parser  - returns single string in lowecase

export const parseSanctionsText = (text) => {
  if (!text || typeof text !== "string") return [];

  return text
    .split("\n") // Split by new line
    .map((line) => line.trim()) // Initial trim
    .filter((line) => line.length > 0) // Remove empty lines
    .map((line) => {
      const cleaned = cleanLine(line);
      return cleaned.toLowerCase();
    });
};

////////////////////////// Fast Search using HashMaps for exact search - no redunddant comparisons
//This is the theoretical maximum speed

export const searchSanctions = (toBeSearchedArr = [], queriesArr = []) => {
  const toBeSearchedHashMAP = new Map(
    toBeSearchedArr.map((eachObj) => [
      eachObj.lowerCaseName,
      eachObj.originalName,
    ]),
  );

  let totalMatches = 0;
  console.log("🚀 ~ 2 Map", toBeSearchedHashMAP);

  const resultantArray = queriesArr.map((eachQuery) => {
    const matched = toBeSearchedHashMAP.has(eachQuery);
    if (matched) totalMatches++;
    return {
      lowerCaseName: eachQuery,
      originalName: toBeSearchedHashMAP.get(eachQuery) ?? null,
      matchFound: matched,
    };
  });

  const totalQueries = queriesArr.length;

  const stats = {
    totalQueries,
    totalMatches,
    totalNotMatched: totalQueries - totalMatches,
    allMatched: totalMatches === totalQueries,
    noneMatched: totalMatches === 0,
  };

  // Save to localStorage after every search

  saveScreeningToHistory(resultantArray, stats);

  return { stats, resultantArray };
};

///////////////////////////////// Dynamic Search ( for less than 5000 results as it simply uses Array methoods ) ////////////////////////////////
///////////// 4 . Filtering and Sorting (Heavy Computation) ///////////////////
/*
   refrence Object for logic 
   {
    "id": 289,
    "originalName": "Jamaat-e- Islami JeI, Jammu and Kashmir",
    "lowerCaseName": "jamaat-e- islami jei, jammu and kashmir"
}
*/

export const filterAndSort = (rows, debouncedSearchQuery, sortOrder) => {
  const sanitizedQuery = debouncedSearchQuery.trim().toLowerCase();
  // console.log("🚀 ~ filterAndSortRows ~ sanitizedQuery:", sanitizedQuery);
  let resultsIncludingQuery = rows;

  if (sanitizedQuery) {
    // const resultsIncludingQuery = pointToRows.forEach((eachRow) => (console.log(eachRow))))
    resultsIncludingQuery = rows.filter((eachRow) =>
      eachRow.lowerCaseName.includes(sanitizedQuery),
    );
    // console.log("🚀 ~ filterAndSortRows ~ resultsIncludingQuery:",resultsIncludingQuery);
  }

  const resultsIncludingQuerySorted = [...resultsIncludingQuery].sort(
    // O(n) spread operator complexity
    (currObj1, currObj2) => {
      if (sortOrder === "asc") {
        return currObj1.lowerCaseName.localeCompare(currObj2.lowerCaseName);
      } else {
        return currObj2.lowerCaseName.localeCompare(currObj1.lowerCaseName);
      }
    },
  ); // O(n) + O(n log(n)) = O(n log(n)) sort timecomplexity

  // Js uses Timsort -
  // console.log(
  //   "🚀 ~ filterAndSortRows ~ resultsIncludingQuerySorted:",
  //   resultsIncludingQuerySorted,
  // );

  return resultsIncludingQuerySorted;
};
