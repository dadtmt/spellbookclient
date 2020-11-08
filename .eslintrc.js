module.exports = {
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:jest/recommended',
      'prettier',
      'prettier/react',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'graphql'],
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json',
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      'linebreak-style': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      "graphql/template-strings": ['error', {
        // Import default settings for your GraphQL client. Supported values:
        // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
        env: 'apollo',
  
        // Import your schema JSON here
        // schemaJson: require('./schema.json'),
  
        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
  
        // OR provide the schema in the Schema Language format
        schemaString: `type ReqLevel {
          classe: String!
          level: String!
        }
        
        type SchoolData {
          school: String!
          subSchool: String
          descriptors: [String]
        }
        
        type Reference {
          supplement: String!
          page: String
        }
        
        type Spell {
          id: Int!
          name: String!
          description: String!
          castingTime: String!
          components: String!
          url: String!
          range: String
          duration: String
          target: String
          savingThrow: String
          spellResistance: String
          reqLevel: [ReqLevel]
          schoolData: SchoolData!
          reference: Reference!
        }
        
        type Spellbook {
          id: String!
          name: String!
          spells: [Spell]
        }
        
        input InputSpellbook {
          name: String
        }
        
        input InputSpellToBook {
          bookId: String!
          spellId: Int!
        }
        
        type ResolveType {
          done: Boolean
        }
        
        type Query {
          getSpells(searchInName: String): [Spell]
          allSpellbooks: [Spellbook!]
        }
        
        type Mutation {
          addSpellbook(input: InputSpellbook!): Spellbook!
          addSpellToBook(input: InputSpellToBook): Spellbook!
          removeSpellFromBook(input: InputSpellToBook): Spellbook!
        }
        `,
  
        // tagName is gql by default
      }]
    },
  };