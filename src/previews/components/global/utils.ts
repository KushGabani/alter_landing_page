import moment from "moment";

export function isIncluded<T>(array: T[], comparison_fn: (e: T) => boolean) {
  return array.some(comparison_fn);
}

export const onlyUnique = (value: number, index: number, array: number[]) => {
  return array.indexOf(value) === index;
};

export function onlyUniqueObjects<T extends { id: number }>(
  objects: (T | undefined)[]
): T[] {
  const uniqueMap: Map<number, T> = new Map();

  for (const obj of objects)
    if (obj && !uniqueMap.has(obj.id)) uniqueMap.set(obj.id, obj);

  return Array.from(uniqueMap.values());
}

export const cleanFilename = (
  filename: string,
  whitelist: string = "-_() " +
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  replace: string = " "
): string => {
  const charLimit = 255;

  // Replace spaces
  for (const r of replace) {
    filename = filename.replace(r, "_");
  }

  // Keep only valid ascii chars
  let cleanedFilename = filename.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");

  // Keep only whitelisted chars
  cleanedFilename = Array.from(cleanedFilename)
    .filter((c) => whitelist.includes(c))
    .join("");
  if (cleanedFilename.length > charLimit) {
    console.log(
      `Warning, filename truncated because it was over ${charLimit}. Filenames may no longer be unique`
    );
  }
  return cleanedFilename.slice(0, charLimit);
};

export const currencyFormatter = (value: string | number) => {
  let num;
  try {
    num = parseFormattedNumber(value.toString());
  } catch (e) {
    return "0";
  }

  return num.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
};

export const numberFormatter = (value: string | number) => {
  let num;
  try {
    num = parseFormattedNumber(value.toString());
  } catch (e) {
    return "0";
  }

  return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};

export const percentageFormatter = (value: number) =>
  `${Intl.NumberFormat("us")
    .format(value * 100)
    .toString()}%`;

export const parseFormattedNumber = (value?: string): number => {
  if (!value) return 0;
  let str = value.replace(/[^0-9.-]+/g, "");
  if (str.length == 0) return 0;
  if (str.indexOf(".") !== str.lastIndexOf(".")) {
    // If there is more than one occurrence of '.', remove the last one
    str = str.slice(0, str.lastIndexOf("."));
  }
  return isNaN(Number(str)) ? 0 : Number(str);
};

export const validNumberStringRegex = /^\d+(\.\d+)?$/;

export const getServerDate = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();
};

export const formatDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
