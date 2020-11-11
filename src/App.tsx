import React, { useReducer } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import AppContext from './AppContext';
import AddSpellbook from './AddSpellbook';
import SelectSpellbook from './SelectSpellbook';
import SpellSearch from './SpellSearch';
import { AppState, Action, Spellbook } from './types';
import ViewSpellbook from './Spellbook';
import { ALL_SPELLBOOKS } from './graphql/queries';
import MainContainer from './styles/MainContainer';

const initialState: AppState = {
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

type AllSpellbooksData = {
  allSpellbooks: Spellbook[];
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { loading, error, data } = useQuery<AllSpellbooksData>(
    ALL_SPELLBOOKS,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <MainContainer>
      <AppContext.Provider value={[state, dispatch]}>
        <AddSpellbook />

        {state.selectedSpellbook ? (
          <>
            {state.spellbookView === 'MODIFY' ? (
              <SpellSearch />
            ) : (
              <ViewSpellbook />
            )}
          </>
        ) : (
          <SelectSpellbook
            spellbooks={data?.allSpellbooks}
            dispatch={dispatch}
          />
        )}
      </AppContext.Provider>
    </MainContainer>
  );
}

export default App;
