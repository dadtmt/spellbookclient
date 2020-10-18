import React, { useContext, useEffect } from 'react';
import AppContext from './AppContext';
import useRemoveSpellFromBook from './hooks/useRemoveSpellFromBook';
import { Spell } from './types';

type ViewSpellProps = {
  spell: Spell;
};

function ViewSpell({ spell }: ViewSpellProps) {
  const [state, dispatch] = useContext(AppContext);

  const [
    removeSpellFromBook,
    { error, data },
  ] = useRemoveSpellFromBook(state?.selectedSpellbook, spell);

  useEffect(() => {
    if (data?.removeSpellFromBook && dispatch)
      dispatch({
        type: 'SELECT_SPELLBOOK',
        spellbook: data.removeSpellFromBook,
        spellbookView: 'SEE',
      });
  }, [data, dispatch]);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <h3>{spell.name}</h3>
      <p>{spell.description}</p>
      <button type="button" onClick={() => removeSpellFromBook()}>
        Retirer
      </button>
    </div>
  );
}

export default ViewSpell;
