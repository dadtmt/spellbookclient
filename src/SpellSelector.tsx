import { gql, useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import AppContext from './AppContext';

import { Spell, Spellbook } from './types';

const ADD_SPELL_TO_BOOK = gql`
  mutation addSpellToBook($input: InputSpellToBook!) {
    addSpellToBook(input: $input) {
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

type AddSpellToBookVars = {
  input: {
    bookId: string | undefined;
    spellId: number;
  };
};

type SpellSelectorProps = { search: string; spell: Spell };

function SpellSelector({
  search,
  spell: { id, name },
}: SpellSelectorProps) {
  const [state, dispatch] = useContext(AppContext);
  const [addSpellToBook, { error, data }] = useMutation<
    { addSpellToBook: Spellbook },
    AddSpellToBookVars
  >(ADD_SPELL_TO_BOOK, {
    variables: {
      input: {
        bookId: state?.selectedSpellbook?.id,
        spellId: id,
      },
    },
  });
  useEffect(() => {
    if (data?.addSpellToBook && dispatch)
      dispatch({
        type: 'SELECT_SPELLBOOK',
        spellbook: data.addSpellToBook,
        spellbookView: 'MODIFY',
      });
  }, [data, dispatch]);
  return (
    <div key={id}>
      {error ? <p>Error: {error.message}</p> : null}
      {data && data.addSpellToBook ? (
        <p>Grimoire {data.addSpellToBook.name} modifié!</p>
      ) : null}
      <p>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[search]}
          autoEscape
          textToHighlight={name}
        />
        <button type="button" onClick={() => addSpellToBook()}>
          Ajouter
        </button>
      </p>
    </div>
  );
}

export default SpellSelector;
