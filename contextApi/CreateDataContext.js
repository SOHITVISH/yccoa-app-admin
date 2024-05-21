import React, { createContext, useReducer } from "react";

// this is the base architecture of the context api
export default (reducer, actions, initalState) => {
  const Context = createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider> 
    );
  };
  return { Context, Provider };
};