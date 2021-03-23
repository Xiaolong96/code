Number.isInteger = function (val) {
  return (
    // typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val
    typeof val === "number" && ~~val === val
  );
};

~~Infinity; // 0
~~NaN; // 0
Math.floor(NaN); // NaN
Math.floor(Infinity); // Infinity

let res = Number.isInteger(Infinity);
console.log(res);
