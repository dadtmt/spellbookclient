import { gql } from '@apollo/client';

export const ALL_SPELLBOOKS = gql`
  query GetAllSpellbooks {
    allSpellbooks {
      id
      name
      spells {
        id
        name
        description
        castingTime
        components
        range
        duration
        target
        savingThrow
        spellResistance
        url
        reqLevel {
          classe
          level
        }
        schoolData {
          school
          subSchool
          descriptors
        }
      }
    }
  }
`;

export const ADD_SPELL_TO_BOOK = gql`
  mutation addSpellToBook($input: InputSpellToBook!) {
    addSpellToBook(input: $input) {
      id
      name
      spells {
        id
        name
        description
        castingTime
        components
        range
        duration
        target
        savingThrow
        spellResistance
        url
        reqLevel {
          classe
          level
        }
        schoolData {
          school
          subSchool
          descriptors
        }
      }
    }
  }
`;

export default {};
