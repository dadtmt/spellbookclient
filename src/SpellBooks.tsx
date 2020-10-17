import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Spellbook } from './types';

type AllSpellbooksData = {
  allSpellbooks: Spellbook[]
}

const ALL_SPELLBOOKS = gql`
query GetAllSpellbooks {
  allSpellbooks {
    id
    name
    spells {
      name
      description
    }
  }
}
`

function SpellBooks() {
  const { loading, error, data } = useQuery<AllSpellbooksData>(ALL_SPELLBOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No Spellbooks... :(</p>;
  return <div>{data.allSpellbooks.map(({ id, name }) => (
    <div key={id}>
      <p>
        {name}
      </p>

    </div>
  ))}</div>
}

export default SpellBooks