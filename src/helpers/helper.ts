// eslint-disable-next-line
export function isEmpty(o: Array<any> | object) {
  if (Array.isArray(o) && o.length === 0) {
    return true;
  }
  return typeof o === 'object' && Object.keys(o).length === 0;
}

// eslint-disable-next-line
export function arrayEquals(a: Array<any>, b: Array<any>) {
  const aSorted = a.sort();
  const bSorted = b.sort();
  return (
    Array.isArray(aSorted) &&
    Array.isArray(bSorted) &&
    aSorted.length === bSorted.length &&
    aSorted.every((val, index) => val === bSorted[index])
  );
}