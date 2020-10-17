export type AppState = {
  selectedBookId: string | boolean;
};

export type Action = {
  type: 'SELECT_SPELLBOOK';
  id: string;
};

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
