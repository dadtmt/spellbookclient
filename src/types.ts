export type AppState = {
  selectedSpellbook: Spellbook | null;
  spellbookView: string;
};

export type Action =
  | {
      type: 'SELECT_SPELLBOOK';
      spellbook: Spellbook | null;
      spellbookView: 'SEE' | 'MODIFY';
    }
  | { type: 'CHANGE_VIEW' };

export type Spell = {
  id: number;
  name: string;
  description: string;
  components: string;
  area?: string;
  castingtime?: string;
  range?: string;
  duration?: string;
  target?: string;
  savingThrow?: string;
  spellResistance?: string;
  url: string;
  reqLevel: { classe: string; level: string }[];
  schoolData: {
    school: string;
    subSchool?: string;
    descriptors: string[];
  };
  reference: { supplement: string; page?: string };
};

export type Spellbook = {
  id: string;
  name: string;
  spells: Spell[];
};
