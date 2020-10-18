import { gql, useMutation } from '@apollo/client';
import { Spell, Spellbook } from '../types';

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

function useRemoveSpellFromBook(
  spellbook: Spellbook | null | undefined, // TODO FIX by fixing state
  { id: spellId }: Spell,
) {
  // TODO FIX by fixing state
  const bookId = spellbook?.id;
  return useMutation<
    { removeSpellFromBook: Spellbook },
    RemoveSpellFromBookVars
  >(REMOVE_SPELL_FROM_BOOK, {
    variables: {
      input: {
        bookId,
        spellId,
      },
    },
  });
}

export default useRemoveSpellFromBook;
