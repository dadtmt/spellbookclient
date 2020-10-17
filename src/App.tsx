import React, { useReducer } from 'react';
import './App.css';
import AppContext from './AppContext';
import SpellBooks from './SpellBooks';
import SpellSearch from './SpellSearch';
import { AppState, Action } from './types';

const initialState = {
  selectedBookId: false,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SELECT_SPELLBOOK':
      return {
        ...state,
        selectedBookId: !state.selectedBookId && action.id,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <div className="App">
      <AppContext.Provider value={[state, dispatch]}>
        <SpellSearch />
        <SpellBooks />
      </AppContext.Provider>
    </div>
  );
}

export default App;
