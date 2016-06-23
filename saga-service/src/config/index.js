'use strict';
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production');
} else if (process.env.NODE_ENV === 'local') {
  module.exports = require('./local');
} else {
  module.exports = require('./development');
}
