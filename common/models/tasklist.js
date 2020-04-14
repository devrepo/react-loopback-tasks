'use strict';

module.exports = function(Tasklist) {
  Tasklist.validatesUniquenessOf('name', {message: 'name is not unique'});
};
