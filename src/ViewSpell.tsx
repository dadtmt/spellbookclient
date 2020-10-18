import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import AppContext from './AppContext';
import { Spell, Spellbook } from './types';

const REMOVE_SPELL_FROM_BOOK = gql`
  mutation removeSpellFromBook($input: InputSpellToBook!) {
    removeSpellFromBook(input: $input) {
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

type RemoveSpellFromBookVars = {
  input: {
    bookId: string | undefined;
    spellId: number;
  };
};

type ViewSpellProps = {
  spell: Spell;
};

function ViewSpell({
  spell: { id, name, description },
}: ViewSpellProps) {
  const [state, dispatch] = useContext(AppContext);
  const [removeSpellFromBook, { error, data }] = useMutation<
    { removeSpellFromBook: Spellbook },
    RemoveSpellFromBookVars
  >(REMOVE_SPELL_FROM_BOOK, {
    variables: {
      input: {
        bookId: state?.selectedSpellbook?.id,
        spellId: id,
      },
    },
  });
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
      <h3>{name}</h3>
      <p>{description}</p>
      <button type="button" onClick={() => removeSpellFromBook()}>
        Retirer
      </button>
    </div>
  );
}

export default ViewSpell;
