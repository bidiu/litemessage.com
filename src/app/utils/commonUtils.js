/**
 * You should always provide the `extractScalar` if the
 * elements of arrays are not scalar value. And the extracted
 * scalar value should be unique acting as an id.
 */
const equalArrays = (array1, array2, extractScalar) => {
  if (array1.length !== array2.length) { return false; }

  let map = new Map();

  if (extractScalar) {
    array1 = array1.map(extractScalar);
    array2 = array2.map(extractScalar);
  }

  let j = 0;
  for (let el of array1) {
    if (map.has(el)) {
      let cnt = map.get(el);
      if (cnt > 1) {
        map.set(el, cnt - 1);
      } else {
        map.delete(el);
      }
      continue;
    }

    let found = false;
    for (; j < array2.length; j++) {
      if (array2[j] === el) {
        found = true;
        j++;
        break;
      }
      let cnt = map.get(array2[j]) || 0;
      map.set(array2[j], cnt + 1);
    }

    if (!found) {
      return false;
    }
  } // end of for loop

  return true;
};

export { equalArrays };
