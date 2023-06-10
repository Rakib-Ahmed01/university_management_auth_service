export const pickPaginationOptions = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  obj: T,
  keys: K[]
) => {
  const options: { [K in keyof T]?: T[K] } = {};

  for (const key of keys) {
    if (obj[key]) {
      options[key] =
        key === "page" || key === "limit"
          ? (Number(obj[key]) as T[K])
          : obj[key];
    }
  }

  return options;
};
