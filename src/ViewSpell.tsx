import React, { useContext, useEffect } from 'react';
import AppContext from './AppContext';
import useRemoveSpellFromBook from './hooks/useRemoveSpellFromBook';
import StyledSpell from './styles/StyledSpell';
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

  const {
    name,
    description,
    schoolData: { school, subSchool, descriptors },
    reqLevel,
    url,
    id,
    ...rest
  } = spell;

  return (
    <StyledSpell>
      {error && <p>Error: {error.message}</p>}
      <h3>{name}</h3>
      <p>{description}</p>
      <dl>
        <dt>School: {school}</dt>
        {subSchool && <dd>Subschool: {subSchool}</dd>}
        {descriptors.length > 0 && (
          <dd>Descriptors: {descriptors.join(',')}</dd>
        )}
      </dl>
      <dl>
        <dt>Required levels: </dt>
        {reqLevel.map(({ classe, level }) => (
          <dd key={classe}>
            {classe}: {level}
          </dd>
        ))}
      </dl>
      <ul>
        {Object.entries(rest).map(
          ([key, value]) =>
            key !== '__typename' &&
            value && (
              <li key={key}>
                {key}: {value}
              </li>
            ),
        )}
        <li>
          <a href={url} target="_blank" rel="noopener noreferrer">
            source
          </a>
        </li>
      </ul>
      <button type="button" onClick={() => removeSpellFromBook()}>
        Retirer
      </button>
    </StyledSpell>
  );
}

export default ViewSpell;
