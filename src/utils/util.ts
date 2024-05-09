export function ellipsis(val: string, arg?: number, showd?: boolean) {
  if (!val) return;
  let length = 50;
  if (arg) length = arg;
  if (val.length > length) {
    if (showd == false) return val.slice(0, length);
    return val.slice(0, length) + '...';
  }
  return val;
}
