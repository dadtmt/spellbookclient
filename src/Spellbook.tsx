import React, { useContext } from 'react';
import AppContext from './AppContext';

function Spellbook() {
  const [state] = useContext(AppContext);

  return (
    <div>
      <h2>Liste des sorts:</h2>
      <div>
        {state?.selectedSpellbook?.spells.map(
          ({ id, name, description }) => (
            <div key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Spellbook;