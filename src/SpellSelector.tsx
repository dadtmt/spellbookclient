import { gql, useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import Highlighter from 'react-highlight-words';
import AppContext from './AppContext';

import { Spell, Spellbook } from './types';

const ADD_SPELL_TO_BOOK = gql`
  mutation addSpelltoBook($input: InputSpellToBook!) {
    addSpellToBook(input: $input) {
      name
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
  const [state] = useContext(AppContext);
  const [addSpelltoBook] = useMutation<
    { addSpelltoBook: Spellbook },
    AddSpellToBookVars
  >(ADD_SPELL_TO_BOOK, {
    variables: {
      input: {
        bookId: state?.selectedSpellbook?.id,
        spellId: id,
      },
    },
  });

  return (
    <div key={id}>
      <p>
        <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={[search]}
          autoEscape
          textToHighlight={name}
        />
        <button type="button" onClick={() => addSpelltoBook()}>
          Ajouter
        </button>
      </p>
    </div>
  );
}

export default SpellSelector;
