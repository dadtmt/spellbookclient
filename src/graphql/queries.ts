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
      }
    }
  }
`;

export default {};
