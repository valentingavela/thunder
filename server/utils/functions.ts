export function getMostRepeatedElement(arr: any[], path: string) {
  let mf = 1;
  let m = 0;
  let item;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i][path] === arr[j][path]) m++;
      if (mf < m) {
        mf = m;
        item = arr[i];
      }
    }

    m = 0;
  }

  return { item, times: mf };
}

export function get2DArrayColumn(arr: any[][], n: number) {
  return arr.map(x => x[n]);
}
