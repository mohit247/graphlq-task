/**
 * @param { import("knex").Knex } Knex
 * @returns { Promise<void> }
 */
import knex from '../knex/knex';
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('password').notNullable();
    table.integer('age').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
