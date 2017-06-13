const knex = require('./knex');//the connection!

module.exports = {
  getAll(){
    return knex('streams');
  },

  getOne(id){
    return knex('streams').where('id', id).first();
  },

  create(stream){
  return knex('streams').insert(stream, '*');
},
  update(id, stream){
  return knex('streams').where('id', id).update(stream, '*');
},

  delete(id) {
    return knex('streams').where('id', id).del()
  }

}
