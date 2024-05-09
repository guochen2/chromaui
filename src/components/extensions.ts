/* eslint-disable @typescript-eslint/no-unsafe-return */
// import './extension.d.ts';
Array.prototype.first = function (func: any) {
  for (let i = 0; i < this.length; i += 1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (func(this[i])) return this[i];
  }
  return null;
};
Array.prototype.exists = function (func: any) {
  for (let i = 0; i < this.length; i += 1) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (func(this[i])) return true;
  }
  return false;
};
Array.prototype.sum = function (func: any) {
  let total = 0;
  for (let i = 0; i < this.length; i += 1) {
    // eslint-disable-next-line no-unused-vars
    total += func(this[i]);
  }
  return total;
};
Array.prototype.remove = function (val: any) {
  const index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.removearray = function (val: Array<any>) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  val.forEach((a) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.remove(a);
  });
};
Array.prototype.removefilter = function (func: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  this.removearray(this.filter(func));
};
// eslint-disable-next-line no-extend-native
String.prototype.subLastIndexOf = function (
  s: string,
  offset: number | 0,
  length: number | 0,
  isBegin: boolean | false
): string {
  const index = this.lastIndexOf(s);
  if (index < 0) {
    return this.toString();
  }
  if (isBegin) {
    return this.substring(0, index + offset);
  }
  if (length > 0) {
    return this.substring(index + offset, length);
  }
  return this.substring(index + offset);
};
// eslint-disable-next-line no-extend-native
String.prototype.subIndexOf = function (
  s: string,
  offset: number | 0,
  length: number | 0,
  isBegin: boolean | false
): string {
  const index = this.indexOf(s);
  if (index < 0) {
    return this.toString();
  }
  if (isBegin) {
    return this.substring(0, index + offset);
  }
  if (length > 0) {
    return this.substring(index + offset, length);
  }
  return this.substring(index + offset);
};
// eslint-disable-next-line no-extend-native
String.prototype.trim = function (): string {
  return this.trimBegin().trimEnd();
};
// eslint-disable-next-line no-extend-native
String.prototype.trimBegin = function (): string {
  return this.replace(/^\s*/, '');
};
// eslint-disable-next-line no-extend-native
String.prototype.trimEnd = function (): string {
  return this.replace(/\s*$/, '');
};
/* eslint-disable @typescript-eslint/no-unsafe-call */
Array.prototype.indexOf = function (val: any) {
  for (let i = 0; i < this.length; i += 1) {
    if (this[i] === val) return i;
  }
  return -1;
};
// eslint-disable-next-line no-extend-native
String.prototype.replaceAllRegex = function (s1: string, s2: string): string {
  return this.replace(new RegExp(s1, 'g'), s2);
};

export {};
