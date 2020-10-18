export type AppState = {
  selectedSpellbook: Spellbook | null;
  spellbookView: string;
  spellbooks: Spellbook[];
};

export type Action =
  | { type: 'FETCHED_ALL_SPELLBOOKS'; spellbooks: Spellbook[] }
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
  castingTime: string;
  components: string;
  range: string;
  duration: string;
  target: string;
  savingThrow: string;
  spellResistance: string;
};

export type Spellbook = {
  id: string;
  name: string;
  spells: Spell[];
};
