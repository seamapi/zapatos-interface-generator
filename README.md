# Zapatos Interface Generator

This is a fork of Zapatos that makes zapatos generate interfaces instead of
a global declared module.

The motivation for this was to be able to use Zapatos's rich generated types
in npm modules, and with [Kysely](https://github.com/koskimas/kysely).

## Installation

```bash
npm install --save-dev zapatos-interface-generator
```

## Usage

Use zapatos as normal and generate a `schema.d.ts` file. When you look at the
schema file, it will be a bit different, there aren't any global declarations,
so you can generate multiple of these files or bundle them into a package
without anything going wrong.

```typescript
export interface foo {
  Table: 'foo';
  Selectable: {
    /**
    * **foo.id**
    * - \`int4\` in database
    * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`
    */
    id: number;
    /**
    * **foo.name**
    * - \`text\` in database
    * - \`NOT NULL\`, no default
    */
    name: string;
  };
  // ...
}

export interface Schema_public {  
  Table: bar["Table"] | foo["Table"];
  Selectable: bar["Selectable"] | foo["Selectable"];
  JSONSelectable: bar["JSONSelectable"] | foo["JSONSelectable"];
  Whereable: bar["Whereable"] | foo["Whereable"];
  Insertable: bar["Insertable"] | foo["Insertable"];
  Updatable: bar["Updatable"] | foo["Updatable"];
  UniqueIndex: bar["UniqueIndex"] | foo["UniqueIndex"];
  Column: bar["Column"] | foo["Column"];
  
  AllBaseTables: [bar["Table"], foo["Table"]];
  AllForeignTables: [];
  AllViews: [];
  AllMaterializedViews: [];
  AllTablesAndViews: [bar["Table"], foo["Table"]];
}

export type Schema = 'public';
export type Table = Schema_public["Table"];
export type Selectable = Schema_public["Selectable"];
export type JSONSelectable = Schema_public["JSONSelectable"];
export type Whereable = Schema_public["Whereable"];
export type Insertable = Schema_public["Insertable"];
export type Updatable = Schema_public["Updatable"];
export type UniqueIndex = Schema_public["UniqueIndex"];
export type Column = Schema_public["Column"];

export type AllSchemas = ['public'];
export type AllBaseTables = [...Schema_public["AllBaseTables"]];
export type AllForeignTables = [...Schema_public["AllForeignTables"]];
export type AllViews = [...Schema_public["AllViews"]];
export type AllMaterializedViews = [...Schema_public["AllMaterializedViews"]];
export type AllTablesAndViews = [...Schema_public["AllTablesAndViews"]];

export type SelectableForTable<T extends Table> = {
  "bar": bar["Selectable"];
  "foo": foo["Selectable"];
}[T];

export type JSONSelectableForTable<T extends Table> = {
  "bar": bar["JSONSelectable"];
  "foo": foo["JSONSelectable"];
}[T];
```

## For zapatos details and documentation, see https://jawj.github.io/zapatos/
