const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const {
  Tenant,
  Employee,
  Person,
  User,
  Manager,
  Pillar,
  Content,
  Point
} = require('./types');

const store = require('../store');

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    tenants: {
      type: new GraphQLList(Tenant),
      resolve() {
        return store.getState().tenants;
      }
    },
    employees: {
      type: new GraphQLList(Employee),
      resolve() {
        return store.getState().employees;
      }
    },
    persons: {
      type: new GraphQLList(Person),
      resolve() {
        return store.getState().persons;
      }
    },
    users: {
      type: new GraphQLList(User),
      resolve() {
        return store.getState().users;
      }
    },
    managers: {
      type: new GraphQLList(Manager),
      resolve() {
        return store.getState().users.filter((user) => {
          return user.roles.includes('manager');
        });
      }
    },
    pillars: {
      type: new GraphQLList(Pillar),
      resolve() {
        return store.getState().pillars;
      }
    },
    contents: {
      type: new GraphQLList(Content),
      resolve() {
        return store.getState().contents;
      }
    },
    points: {
      type: new GraphQLList(Point),
      resolve() {
        return store.getState().points;
      }
    },
    leaderboard: {
      args: {
        begin: {
          type: GraphQLInt,
          defaultValue: 0
        },
        end: {type: new GraphQLNonNull(GraphQLInt)}
      },
      type: new GraphQLList(User),
      resolve(source, { begin, end }) {
        const orderedUserIds = _.sortBy(store.getState().points, (p) => p.count)
                                .map( (p) => p.userId);

        const subset = orderedUserIds.slice(begin, end);

        return subset.map( userId =>
            _.find(
              store.getState().users,
              user => user._id === userId
            )
          );
      }
    }
  }
});

module.exports = query;
