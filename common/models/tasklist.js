'use strict';
const app = require('../../server/server');
module.exports = function(Tasklist) {
  Tasklist.validatesUniquenessOf('name', {message: 'name is not unique'});
  
  Tasklist.observe('before delete', function(ctx, next) {  
    const Task = app.models.Task;
    Task.destroyAll({taskListId: ctx.where.id}, function(err, info){
        if (err){
          return next(err);
        }
        next();
    }) 
  })
};
