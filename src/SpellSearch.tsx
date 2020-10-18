import React, { useState } from 'react';

import { useQuery, gql } from '@apollo/client';
import { Spell } from './types';
import SpellSelector from './SpellSelector';

type GetSpellsData = {
  getSpells: Spell[];
};

type GetSpellsVars = {
  name: string;
};

const GET_SPELLS = gql`
  query GetSpells($name: String!) {
    getSpells(name: $name) {
      id
      name
      description
      components
    }
  }
`;

export type SpellSearchResultsProps = {
  search: string;
};

function SpellSearchResults({ search }: SpellSearchResultsProps) {
  const { loading, error, data } = useQuery<
    GetSpellsData,
    GetSpellsVars
  >(GET_SPELLS, { variables: { name: search } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || data?.getSpells.length === 0)
    return <p>No Spells... :(</p>;
  return (
    <div>
      <h2>Ajouter un sort:</h2>
      {data.getSpells.map((spell) => (
        <SpellSelector key={spell.id} spell={spell} search={search} />
      ))}
    </div>
  );
}

function SpellSearch() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <form>
        <input
          placeholder="Cherchez un sort"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      {search.length >= 3 && <SpellSearchResults search={search} />}
    </div>
  );
}

export default SpellSearch;
