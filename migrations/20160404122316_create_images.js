
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', function(t){
    t.increments('id');
    t.integer('party_id');
    t.string('image_url');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('images')
};
