export default function translationBuilder(objKeys: any[]) {
  const keys: string[] = objKeys.reduce((acc, value) => acc.concat(Object.keys(value)), []);

  const result = keys.reduce((res, value, index, arr) => {
    const arrayToCompare = arr.slice(index + 1);
    const hasDuplicate = arrayToCompare.includes(value);

    if (hasDuplicate) {
      res.push(value);
    }

    return res;
  }, []);

  if (result.length > 0) {
    throw Error(`Duplicate keys found in translation service: ${result.join(', ')}`);
  }

  const translations = objKeys.reduce((acc, value) => Object.assign(acc, value), {});

  return translations;
}
