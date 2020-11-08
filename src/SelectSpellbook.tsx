import React from 'react';
import { Action, Spellbook } from './types';

type SelectSpellbookProps = {
  spellbooks: Spellbook[] | undefined;
  dispatch: React.Dispatch<Action>;
};

function SelectSpellbook({
  spellbooks,
  dispatch,
}: SelectSpellbookProps) {
  return (
    <div>
      <h2>Choisir un grimoire:</h2>
      {spellbooks &&
        spellbooks.map(({ id, name, spells }) => (
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
