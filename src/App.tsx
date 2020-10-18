import React, { useReducer } from 'react';
import './App.css';
import AppContext from './AppContext';
import AddSpellbook from './AddSpellbook';
import Spellbooks from './Spellbooks';
import SpellSearch from './SpellSearch';
import { AppState, Action } from './types';
import Spellbook from './Spellbook';

const initialState = {
  selectedSpellbook: null,
  spellbookView: 'SEE',
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SELECT_SPELLBOOK':
      return {
        ...state,
        selectedSpellbook: action.spellbook,
        spellbookView: action.spellbookView,
      };
    case 'CHANGE_VIEW':
      return {
        ...state,
        spellbookView:
          state.spellbookView === 'SEE' ? 'MODIFY' : 'SEE',
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

        {state.selectedSpellbook ? (
          <>
            {state.spellbookView === 'MODIFY' ? (
              <SpellSearch />
            ) : (
              <Spellbook />
            )}
          </>
        ) : (
          <Spellbooks />
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
