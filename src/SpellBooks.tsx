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
  const [state, dispatch] = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No Spellbooks... :(</p>;
  return (
    <div>
      <h2>Choisir un grimoire:</h2>
      {data.allSpellbooks
        .filter(({ id }) => state?.selectedSpellbook?.id !== id)
        .map(({ id, name, spells }) => (
          <div key={id}>
            <p>
              {name}
              <button
                type="button"
                onClick={() =>
                  dispatch &&
                  dispatch({
                    type: 'SELECT_SPELLBOOK',
                    spellbook: { id, name, spells },
                    spellbookView: 'SEE',
                  })
                }
              >
                Sélectionner
              </button>
            </p>
          </div>
        ))}
    </div>
  );
}

export default SpellBooks;
