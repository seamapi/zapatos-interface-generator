# Snapshot report for `tests/schemaGenerationExample.test.ts`

The actual snapshot is saved in `schemaGenerationExample.test.ts.snap`.

Generated by [AVA](https://avajs.dev).

## simple generation example

> Snapshot 1

    `/*␊
    ** DON'T EDIT THIS FILE **␊
    It's been generated by Zapatos, and is liable to be overwritten␊
    ␊
    Zapatos: https://jawj.github.io/zapatos/␊
    Copyright (C) 2020 - 2022 George MacKerron␊
    Released under the MIT licence: see LICENCE file␊
    */␊
    ␊
    declare module 'zapatos/schema' {␊
    ␊
      import type * as db from 'zapatos/db';␊
    ␊
      // got a type error on schemaVersionCanary below? update by running \`npx zapatos\`␊
      export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 104 }␊
    ␊
    ␊
      /* === schema: public === */␊
    ␊
      /* --- enums --- */␊
      /* (none) */␊
    ␊
      /* --- tables --- */␊
    ␊
      /**␊
       * **foo**␊
       * - Table in database␊
       */␊
      export namespace foo {␊
        export type Table = 'foo';␊
        export interface Selectable {␊
          /**␊
          * **foo.id**␊
          * - \`int4\` in database␊
          * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`␊
          */␊
          id: number;␊
          /**␊
          * **foo.name**␊
          * - \`text\` in database␊
          * - \`NOT NULL\`, no default␊
          */␊
          name: string;␊
        }␊
        export interface JSONSelectable {␊
          /**␊
          * **foo.id**␊
          * - \`int4\` in database␊
          * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`␊
          */␊
          id: number;␊
          /**␊
          * **foo.name**␊
          * - \`text\` in database␊
          * - \`NOT NULL\`, no default␊
          */␊
          name: string;␊
        }␊
        export interface Whereable {␊
          /**␊
          * **foo.id**␊
          * - \`int4\` in database␊
          * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`␊
          */␊
          id?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;␊
          /**␊
          * **foo.name**␊
          * - \`text\` in database␊
          * - \`NOT NULL\`, no default␊
          */␊
          name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;␊
        }␊
        export interface Insertable {␊
          /**␊
          * **foo.id**␊
          * - \`int4\` in database␊
          * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`␊
          */␊
          id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;␊
          /**␊
          * **foo.name**␊
          * - \`text\` in database␊
          * - \`NOT NULL\`, no default␊
          */␊
          name: string | db.Parameter<string> | db.SQLFragment;␊
        }␊
        export interface Updatable {␊
          /**␊
          * **foo.id**␊
          * - \`int4\` in database␊
          * - \`NOT NULL\`, default: \`nextval('foo_id_seq'::regclass)\`␊
          */␊
          id?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;␊
          /**␊
          * **foo.name**␊
          * - \`text\` in database␊
          * - \`NOT NULL\`, no default␊
          */␊
          name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;␊
        }␊
        export type UniqueIndex = 'foo_pkey';␊
        export type Column = keyof Selectable;␊
        export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;␊
        export type SQLExpression = Table | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Whereable | Column | db.ParentColumn | db.GenericSQLExpression;␊
        export type SQL = SQLExpression | SQLExpression[];␊
      }␊
    ␊
      /* --- aggregate types --- */␊
    ␊
      export namespace public {  ␊
        export type Table = foo.Table;␊
        export type Selectable = foo.Selectable;␊
        export type JSONSelectable = foo.JSONSelectable;␊
        export type Whereable = foo.Whereable;␊
        export type Insertable = foo.Insertable;␊
        export type Updatable = foo.Updatable;␊
        export type UniqueIndex = foo.UniqueIndex;␊
        export type Column = foo.Column;␊
      ␊
        export type AllBaseTables = [foo.Table];␊
        export type AllForeignTables = [];␊
        export type AllViews = [];␊
        export type AllMaterializedViews = [];␊
        export type AllTablesAndViews = [foo.Table];␊
      }␊
    ␊
    ␊
    ␊
      /* === global aggregate types === */␊
    ␊
      export type Schema = 'public';␊
      export type Table = public.Table;␊
      export type Selectable = public.Selectable;␊
      export type JSONSelectable = public.JSONSelectable;␊
      export type Whereable = public.Whereable;␊
      export type Insertable = public.Insertable;␊
      export type Updatable = public.Updatable;␊
      export type UniqueIndex = public.UniqueIndex;␊
      export type Column = public.Column;␊
    ␊
      export type AllSchemas = ['public'];␊
      export type AllBaseTables = [...public.AllBaseTables];␊
      export type AllForeignTables = [...public.AllForeignTables];␊
      export type AllViews = [...public.AllViews];␊
      export type AllMaterializedViews = [...public.AllMaterializedViews];␊
      export type AllTablesAndViews = [...public.AllTablesAndViews];␊
    ␊
    ␊
      /* === lookups === */␊
    ␊
      export type SelectableForTable<T extends Table> = {␊
        "foo": foo.Selectable;␊
      }[T];␊
    ␊
      export type JSONSelectableForTable<T extends Table> = {␊
        "foo": foo.JSONSelectable;␊
      }[T];␊
    ␊
      export type WhereableForTable<T extends Table> = {␊
        "foo": foo.Whereable;␊
      }[T];␊
    ␊
      export type InsertableForTable<T extends Table> = {␊
        "foo": foo.Insertable;␊
      }[T];␊
    ␊
      export type UpdatableForTable<T extends Table> = {␊
        "foo": foo.Updatable;␊
      }[T];␊
    ␊
      export type UniqueIndexForTable<T extends Table> = {␊
        "foo": foo.UniqueIndex;␊
      }[T];␊
    ␊
      export type ColumnForTable<T extends Table> = {␊
        "foo": foo.Column;␊
      }[T];␊
    ␊
      export type SQLForTable<T extends Table> = {␊
        "foo": foo.SQL;␊
      }[T];␊
    ␊
    }␊
    `