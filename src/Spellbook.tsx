import React, { useContext } from 'react';
import AppContext from './AppContext';
import ViewSpell from './ViewSpell';

function Spellbook() {
  const [state] = useContext(AppContext);
  const isThereSpells =
    state?.selectedSpellbook &&
    state?.selectedSpellbook?.spells.length > 0;

  return (
    <div>
      <h2>Liste des sorts:</h2>
      <div>
        {isThereSpells ? (
          state?.selectedSpellbook?.spells.map((spell) => (
            <ViewSpell key={spell.id} spell={spell} />
          ))
        ) : (
          <p>Pas de sorts dans ce grimoire</p>
        )}
      </div>
    </div>
  );
}

export default Spellbook;
