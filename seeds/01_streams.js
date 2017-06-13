const streams = require('../streamdata')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE streams RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('streams').insert(streams);
    });
};
