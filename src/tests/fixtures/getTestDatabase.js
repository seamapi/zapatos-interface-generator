"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestDatabase = void 0;
const ava_postgres_1 = require("ava-postgres");
exports.getTestDatabase = (0, ava_postgres_1.getTestPostgresDatabaseFactory)({
    postgresVersion: "14",
});
