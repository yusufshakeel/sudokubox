'use strict';

function arrayEquals(a, b) {
  const aSorted = a.sort();
  const bSorted = b.sort();
  return (
    Array.isArray(aSorted) &&
    Array.isArray(bSorted) &&
    aSorted.length === bSorted.length &&
    aSorted.every((val, index) => val === bSorted[index])
  );
}

module.exports = { arrayEquals };
