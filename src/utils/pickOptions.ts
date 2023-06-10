export const pickOptions = <
  T extends Record<string, unknown>,
  K extends keyof T
>(
  obj: T,
  keys: K[]
) => {
  const options: { [K in keyof T]: T[K] } = {} as { [K in keyof T]: T[K] };

  for (const key of keys) {
    if (obj[key]) {
      if (key === "limit") {
        options[key] = Number(obj[key]) as T[K];
      } else if (key === "page") {
        options[key] = Number(obj[key]) as T[K];
      } else if (key === "sortBy") {
        options[key] = (obj[key] || "createdAt") as T[K];
      } else if (key === "sortOrder") {
        options[key] = (obj[key] || "desc") as T[K];
      } else {
        options[key] = obj[key];
      }
    }
  }

  return options;
};
