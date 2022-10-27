// LIBs
import React, { createContext, useReducer } from 'react';

// REDUCERs
import { exempleInitialState, exempleReducer } from '../reducers/exempleReducer';

const initialState = {
  exemple: exempleInitialState,
  _api: "http://localhost:8000/api/",
  _path: window.location.pathname
}

export const Context = createContext({
  state: initialState,
  dispatch: () => null
})

const mainReducer = (state, action) => ({
  exemple: exempleReducer(state.exemple, action)
})

export const ContextProvider = ({ children }) => {

  const [ state, dispatch ] = useReducer(mainReducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}