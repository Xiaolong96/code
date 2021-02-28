function _instanceof(o, F) {
  let p = Object.getPrototypeOf(o);
  while (p) {
    if (F.prototype === p) {
      return true;
    }
    p = Object.getPrototypeOf(p);
  }
  return false;
}

function _instanceof2(o, F) {
  while (o) {
    // eslint-disable-next-line no-prototype-builtins
    if (F.prototype.isPrototypeOf(o)) {
      return true;
    }
    o = Object.getPrototypeOf(o);
  }
  return false;
}

/** --------test-------- */

console.log(_instanceof({}, Object));
console.log(_instanceof2([], Array));
