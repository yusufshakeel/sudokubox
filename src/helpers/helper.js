'use strict';

function isEmpty(o) {
  if (Array.isArray(o) && o.length === 0) {
    return true;
  }
  return typeof o === 'object' && Object.keys(o).length === 0;
}

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

module.exports = { arrayEquals, isEmpty };
