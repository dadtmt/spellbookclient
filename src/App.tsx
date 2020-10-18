import React, { useEffect, useReducer } from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import AppContext from './AppContext';
import AddSpellbook from './AddSpellbook';
import SelectSpellbook from './SelectSpellbook';
import SpellSearch from './SpellSearch';
import { AppState, Action, Spellbook } from './types';
import ViewSpellbook from './Spellbook';

const initialState: AppState = {
  selectedSpellbook: null,
  spellbookView: 'SEE',
  spellbooks: [],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'FETCHED_ALL_SPELLBOOKS':
      return {
        ...state,
        spellbooks: action.spellbooks,
      };
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

const ALL_SPELLBOOKS = gql`
  query GetAllSpellbooks {
    allSpellbooks {
      id
      name
      spells {
        id
        name
        description
      }
    }
  }
`;

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { loading, error, data } = useQuery<AllSpellbooksData>(
    ALL_SPELLBOOKS,
  );
  useEffect(() => {
    if (data?.allSpellbooks && dispatch) {
      dispatch({
        type: 'FETCHED_ALL_SPELLBOOKS',
        spellbooks: data.allSpellbooks,
      });
    }
  }, [data, dispatch]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="App">
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
          <SelectSpellbook />
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
