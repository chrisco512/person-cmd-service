const {
    USER_CREATED,
    MANAGER_ADDED
} = require('../../event_types');

function reducer(users = [], action) {
    switch (action.type) {
        case USER_CREATED:
            return [...users, action.payload];
        case MANAGER_ADDED:
            return managerAdded(users, action.payload);
        default:
            return users;
    }
}

function managerAdded(users, payload) {
    let index = -1;

    const user = users.filter((user, i) => {
        if (user._id === payload.userId) {
            index = i;
            return true;
        }

        return false;
    });


    if (user.length < 1) {
        return users;
    }

    const u = Object.assign({}, user[0], {
        managerId: payload.managerId
    });

    return [...users.slice(0, index), u, ...users.slice(index + 1)];
}

module.exports = reducer;
