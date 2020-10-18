import React, { useReducer } from 'react';
import './App.css';
import AppContext from './AppContext';
import AddSpellbook from './AddSpellbook';
import SpellBooks from './SpellBooks';
import SpellSearch from './SpellSearch';
import { AppState, Action } from './types';

const initialState = {
  selectedSpellbook: null,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SELECT_SPELLBOOK':
      return {
        ...state,
        selectedSpellbook: action.spellbook,
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
        <AddSpellbook />
        {state.selectedSpellbook ? <SpellSearch /> : <SpellBooks />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
