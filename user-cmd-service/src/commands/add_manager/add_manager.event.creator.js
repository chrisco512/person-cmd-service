const { MANAGER_ADDED } = require('../event_types');

function managerAdded({ userId, managerId }) {
  console.log('EVENT CREATOR:', { userId: managerId });

  return {
    type: MANAGER_ADDED,
    payload: {
      userId,
      managerId
    }
  };
}

module.exports = managerAdded;
