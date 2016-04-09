
exports.up = function(knex, promise) {
  return knex.schema.createTable('parties', function(t){
    t.increments('id');
    t.string('facebook_id');
    t.bool('new');
    t.string('created_at')
  })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('parties')
};
