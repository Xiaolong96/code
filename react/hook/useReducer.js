/**
 * 当组件的状态比较复杂，也经常以特定的方式来管理状态，那么 redux 中的 reducer 可能是一个比较好的方式去处理；
 * 举个例子：比如一个 todolist 组件，加减 TODO 项时需要操作多个状态，那么每次这样操作会使得更新逻辑变得复杂；
 * 如果提前定义好加或减（特定操作）的更新逻辑（state 的更新），再去触发特定操作岂不是变得很简单，这不就是 reducer ?
 * 所以 reducer 就是一组更新 state 的特定操作，以简化复杂的状态更新。（让 reducer 驱动它管理 state）
 */
import { useState } from "react";

// 先定义一个 reducer
function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    // ... other actions ...
    default:
      return state;
  }
}

// 那么如何使用呢？既然是简化 useState 的，那么用法差不多，只是 setState 变成了一个触发更新类型的 dispatch
// const [state, dispatch] = useReducer(todosReducer, initialState);

function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  const dispatch = (action) => {
    const nextState = reducer(state, action);
    setState(nextState);
  };
  return [state, dispatch];
}

// useReducer 是适合用于管理包含多个子值的 state 对象。

const [state, dispatch] = useReducer(todosReducer, []);

/**
 * redux createStore
 * @param {*} reducer
 */
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
