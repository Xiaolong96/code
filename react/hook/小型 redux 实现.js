/**
 * 管理包含多个子值的复杂 state 对象 ==> useReducer
 * 组件树共享 ==> createContext、useContext
 * 不仅能获取共享数据，还要能修改 ==> Provider value { state, dispatch }
 */

import React from "react";

// context.js
export const Context = React.createContext(null);

export const initialState = {
  value: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_NUM":
      return { ...state, value: state.value + 1 };
    case "REDUCE_NUM":
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
}

// App.js
export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <ChildFirst />
      <ChildSecond />
    </Context.Provider>
  );
}

// ChildFirst.js
export function ChildFirst() {
  const AppContext = useContext(Context);

  return (
    <div>
      <button
        onClick={() => {
          AppContext.dispatch({
            type: "ADD_NUM",
            payload: {},
          });
        }}
      >
        addNum
      </button>
    </div>
  );
}

// ChildSecond.js

export function ChildSecond() {
  const AppContext = useContext(Context);

  return <div>{AppContext.state.value + "s"}</div>;
}
