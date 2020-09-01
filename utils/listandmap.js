// https://stackoverflow.com/a/38327540
export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function getRowAsArray(list, sizeOfArray) {
  const map = new Map();
  [...Array(sizeOfArray).keys()].forEach((key) => {
    const item = [...list.filter(each => each.col === key), {col: key, value: ""}][0]
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
