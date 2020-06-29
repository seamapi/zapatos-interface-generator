/*
Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 George MacKerron
Released under the MIT licence: see LICENCE file
*/

import * as pg from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { enumDataForSchema, enumTypesForEnumData } from './enums';
import { tablesInSchema, definitionForTableInSchema, crossTableTypesForTables } from './tables';
import { moduleRoot } from './config';
import type { CompleteConfig } from './config';


const header = () => {
  const
    pkgPath = path.join(moduleRoot(), 'package.json'),
    pkg = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }));

  return `/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos (v${pkg.version}), and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 George MacKerron
Released under the MIT licence: see LICENCE file
*/

import type {
  JSONValue,
  JSONArray,
  DateString,
  SQLFragment,
  SQL,
  GenericSQLExpression,
  ColumnNames,
  ColumnValues,
  ParentColumn,
  DefaultType,
} from "./src/core";

`;
};

export const tsForConfig = async (config: CompleteConfig) => {
  const
    { schemas, db } = config,
    warn = config.warningListener === true ? console.warn :
      config.warningListener || (() => void 0),
    pool = new pg.Pool(db),
    schemaData = (await Promise.all(
      Object.keys(schemas).map(async schema => {
        const
          rules = schemas[schema],
          tables = rules.exclude === '*' ? [] :  // exclude takes precedence
            (rules.include === '*' ? await tablesInSchema(schema, pool) : rules.include)
              .filter(table => rules.exclude.indexOf(table) < 0),
          enums = await enumDataForSchema(schema, pool),
          tableDefs = await Promise.all(tables.map(async table =>
            definitionForTableInSchema(table, schema, enums, pool, warn))),
          schemaDef = `\n/* === schema: ${schema} === */\n` +
            `\n/* --- enums --- */\n` +
            enumTypesForEnumData(enums) +
            `\n\n/* --- tables --- */\n` +
            tableDefs.join('\n');

        return { schemaDef, tables };
      }))
    ),
    schemaDefs = schemaData.map(r => r.schemaDef),
    schemaTables = schemaData.map(r => r.tables),
    allTables = ([] as string[]).concat(...schemaTables),
    ts = header() +
      schemaDefs.join('\n\n') +
      `\n\n/* === cross-table types === */\n` +
      crossTableTypesForTables(allTables);

  await pool.end();
  return ts;
};