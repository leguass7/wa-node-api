export function isObject(value: any): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof RegExp) &&
    !(value instanceof Error) &&
    !(value instanceof Date) &&
    !Array.isArray(value)
  );
}
