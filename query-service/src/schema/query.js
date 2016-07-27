const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
const {
  Analytics,
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
    analytics: {
      type: Analytics,
      resolve() {
        console.log(store.getState());
        return {
          tenantCount: store.getState().tenants.length,
          userCount: store.getState().users.length,
          managerCount: store.getState().users.filter((user) => {
            return user.roles.includes('manager');
          }).length,
          employeeCount: store.getState().users.length - store.getState().users.filter((user) => {
            return user.roles.includes('employee');
          }).length,
          totalPoints: store.getState().points.reduce((acc, x) => {
            return acc + x.count;
          }, 0),
          pillarCount: store.getState().pillars.length
          // contentCount: store.getState().contents.length
         };
      }
    },
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
        // lodash _.sortBy sorts ascending, so we reverse it.
        const orderedUserIds = _.sortBy(store.getState().points, (p) => p.count)
                                .reverse()
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
