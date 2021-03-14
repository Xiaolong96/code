import React, { useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// const Test = () => {
//   const [count, setCount] = React.useState(0);
//   const prevCount = usePrevious(count);

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>+</button>
//       <button onClick={() => setCount(count - 1)}>-</button>
//       <p>
//         Now: {count}, before: {prevCount}
//       </p>
//     </div>
//   );
// };

// export default Test;
