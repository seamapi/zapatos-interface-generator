import test from "ava";
import { generate } from "../src/generate";
import mockFS from "mock-fs";
import * as fs from "fs";
import { getTestDatabase } from "./fixtures/getTestDatabase";

test("simple generation example", async (t) => {
  const { pool, connectionString } = await getTestDatabase();

  await pool.query(
    "CREATE TABLE foo (id serial PRIMARY KEY, name text NOT NULL)"
  );
  await pool.query(
    "CREATE TABLE bar (bar_id uuid PRIMARY KEY, num integer)"
  );

  mockFS({});
  await generate({
    outDir: "/out",
    db: {
      connectionString,
    },
  });
  const outFiles = fs.readdirSync("/out/zapatos").sort();
  t.deepEqual(outFiles, [".eslintrc.json", "schema.d.ts"]);

  const schema = fs.readFileSync("/out/zapatos/schema.d.ts", "utf8");

  mockFS.restore();
  t.snapshot(schema);
});
