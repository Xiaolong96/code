// import useState next to FunctionComponent
import React, { useState, useRef, useCallback } from "react";

// our components props accept a number for the initial value
const Example: React.FC<{ initial?: number }> = ({ initial = 0 }) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);

  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    if (inputEl && inputEl.current != null) {
      inputEl.current.focus();
    }
  };

  return (
    <>
      <p>Clicks: {clicks}</p>
      <button
        onClick={useCallback(() => {
          console.info("🎈 %c[useCallback execute]\n", "color: #1890ff;");
          setClicks(clicks + 1);
        }, [clicks])}
      >
        +
      </button>
      <button onClick={() => setClicks(clicks - 1)}>-</button>

      {/* in addition, inputEl only can be used with input elements. Yay! */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};

export default Example;
