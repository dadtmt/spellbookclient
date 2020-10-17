import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spellbook } from './types';
import AppContext from './AppContext';

type AllSpellbooksData = {
  allSpellbooks: Spellbook[];
};

const ALL_SPELLBOOKS = gql`
  query GetAllSpellbooks {
    allSpellbooks {
      id
      name
      spells {
        name
        description
      }
    }
  }
`;

function SpellBooks() {
  const { loading, error, data } = useQuery<AllSpellbooksData>(
    ALL_SPELLBOOKS,
  );
  const [appState, dispatch] = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No Spellbooks... :(</p>;
  return (
    <div>
      {data.allSpellbooks.map(({ id, name }) => (
        <div key={id}>
          <p>
            {name}
            <button
              type="submit"
              onClick={() =>
                dispatch && dispatch({ type: 'SELECT_SPELLBOOK', id })
              }
            >
              {appState?.selectedBookId !== id
                ? 'Selectioner'
                : 'Déselectioner'}
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default SpellBooks;
