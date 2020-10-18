import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from './AppContext';
import { Spellbook } from './types';

const ADD_SPELLBOOK = gql`
  mutation addSpellbook($input: InputSpellbook!) {
    addSpellbook(input: $input) {
      id
      name
    }
  }
`;

type AddSpellbookVars = {
  input: {
    name: string;
  };
};

function AddSpellbook() {
  const [name, setName] = useState('');
  const [state, dispatch] = useContext(AppContext);
  const [addSpellbook, { error, data }] = useMutation<
    { addSpellbook: Spellbook },
    AddSpellbookVars
  >(ADD_SPELLBOOK, {
    variables: { input: { name } },
  });
  useEffect(() => {
    if (data?.addSpellbook && dispatch)
      dispatch({
        type: 'SELECT_SPELLBOOK',
        spellbook: data.addSpellbook,
        spellbookView: 'MODIFY',
      });
  }, [data, dispatch]);
  return (
    <div>
      {error ? <p>Error: {error.message}</p> : null}
      {data && data.addSpellbook.id ? (
        <p>Grimoire {data.addSpellbook.name} Saved!</p>
      ) : null}
      {state?.selectedSpellbook ? (
        <div>
          <p>Grimoire {state.selectedSpellbook.name} sélectionné</p>
          <button
            type="button"
            onClick={() =>
              dispatch &&
              dispatch({
                type: 'SELECT_SPELLBOOK',
                spellbook: null,
                spellbookView: 'SEE',
              })
            }
          >
            Changer de grimoire
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch &&
              dispatch({
                type: 'CHANGE_VIEW',
              })
            }
          >
            {state.spellbookView === 'SEE'
              ? 'Ajouter des sorts'
              : 'Voir les sorts'}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addSpellbook();
          }}
        >
          <input
            id="name"
            type="text"
            placeholder="Nom du grimoire"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Créer</button>
        </form>
      )}
    </div>
  );
}

export default AddSpellbook;
