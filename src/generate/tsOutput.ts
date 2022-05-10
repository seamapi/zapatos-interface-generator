/*
Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2022 George MacKerron
Released under the MIT licence: see LICENCE file
*/

import * as pg from 'pg';

import { enumDataForSchema, enumTypesForEnumData } from './enums';
import { Relation, relationsInSchema, definitionForRelationInSchema, crossTableTypesForTables } from './tables';
import { header } from './header';
import type { CompleteConfig } from './config';
import type { SchemaVersionCanary } from "../db/canary";


export interface CustomTypes {
  [name: string]: string;  // any, or TS type for domain's base type
}

const
  canaryVersion: SchemaVersionCanary['version'] = 103,
  versionCanary = `
// got a type error on schemaVersionCanary below? update by running \`npx zapatos\`
export interface schemaVersionCanary extends db.SchemaVersionCanary { version: ${canaryVersion} }
`;

const declareModule = (module: string, declarations: string) => `
declare module '${module}' {
${declarations.replace(/^(?=[ \t]*\S)/gm, '  ')}
}
`;

const customTypeHeader = `/*
** Please edit this file as needed **
It's been generated by Zapatos as a custom type definition placeholder, and won't be overwritten
*/
`;

const sourceFilesForCustomTypes = (customTypes: CustomTypes) =>
  Object.fromEntries(Object.entries(customTypes)
    .map(([name, baseType]) => [
      name,
      customTypeHeader + declareModule('zapatos/custom',
        (baseType === 'db.JSONValue' ? `import type * as db from 'zapatos/db';\n` : ``) +
        `export type ${name} = ${baseType};  // replace with your custom type or interface as desired`
      )
    ]));

function indentAll(s: string, level: number, char = ' ') {
  if (level === 0) return s;
  return s.replace(/^/gm, char.repeat(level));
}

export const tsForConfig = async (config: CompleteConfig, debug: (s: string) => void) => {
  let querySeq = 0;
  const
    { schemas, db } = config,
    pool = new pg.Pool(db),
    queryFn = async (query: pg.QueryConfig, seq = querySeq++) => {
      try {
        debug(`>>> query ${seq} >>>\n${query.text.replace(/^\s+|\s+$/mg, '')}\n+ ${JSON.stringify(query.values)}\n`);
        const result = await pool.query(query);
        debug(`<<< result ${seq} <<<\n${JSON.stringify(result, null, 2)}\n`);
        return result;

      } catch (e) {
        console.log(`*** error ${seq} ***`, e);
        process.exit(1);
      }
    },
    customTypes = {},
    schemaData = (await Promise.all(
      Object.keys(schemas).map(async schema => {
        const
          rules = schemas[schema],
          tables = rules.exclude === '*' ? [] :  // exclude takes precedence
            (await relationsInSchema(schema, queryFn))
              .filter(rel => rules.include === '*' || rules.include.indexOf(rel.name) >= 0)
              .filter(rel => rules.exclude.indexOf(rel.name) < 0),
          enums = await enumDataForSchema(schema, queryFn),
          tableDefs = await Promise.all(tables.map(async table =>
            definitionForRelationInSchema(table, schema, enums, customTypes, config, queryFn))),
          schemaIsUnqualified = schema === config.unqualifiedSchema,
          schemaDef = `\n/* === schema: ${schema} === */\n` +
            (schemaIsUnqualified ? '' : `export namespace ${schema} {\n`) +
            indentAll(
              `\n/* --- enums --- */\n` +
              enumTypesForEnumData(enums) +
              `\n\n/* --- tables --- */\n` +
              tableDefs.sort().join('\n')
              , schemaIsUnqualified ? 0 : 2) +
            (schemaIsUnqualified ? '' : `}\n`);

        return { schemaDef, tables };
      }))
    ),
    schemaDefs = schemaData.map(r => r.schemaDef).sort(),
    schemaTables = schemaData.map(r => r.tables),
    allTables = ([] as Relation[]).concat(...schemaTables).sort((a, b) => a.name.localeCompare(b.name)),
    hasCustomTypes = Object.keys(customTypes).length > 0,
    ts = header() + declareModule('zapatos/schema',
      `\nimport type * as db from 'zapatos/db';\n` +
      (hasCustomTypes ? `import type * as c from 'zapatos/custom';\n` : ``) +
      versionCanary +
      schemaDefs.join('\n\n') +
      `\n\n/* === cross-table types === */\n` +
      crossTableTypesForTables(allTables)
    ),
    customTypeSourceFiles = sourceFilesForCustomTypes(customTypes);

  await pool.end();
  return { ts, customTypeSourceFiles };
};
