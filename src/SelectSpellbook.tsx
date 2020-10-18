import React, { useContext } from 'react';
import AppContext from './AppContext';

function SelectSpellbook() {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div>
      <h2>Choisir un grimoire:</h2>
      {state?.spellbooks.map(({ id, name, spells }) => (
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

export default SelectSpellbook;
