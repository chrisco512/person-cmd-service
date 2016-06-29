'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require("babel-polyfill");

const koa = require('koa');
const jwt = require('koa-jwt');
const util = require('util');
const router = require('koa-router')();
const {
    pageNotFound, error, unauthorized, unprotected
} = require('./middlewares');
const jsonBody = require('koa-json-body');
const config = require('./config');
const store = require('./store/store');
const co = require('co');
const cors = require('koa-cors');
const {
	rebuildQueryModelsFromEvents
} = require('./utils');
const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });
const qs = require('koa-qs');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const app = module.exports = koa();
const port = process.env.PORT || config.port || 8080;

qs(app);
app.use(cors());

setupHandlers();

app.use(jsonBody({
    limit: '10kb'
}));
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);
router.get('/', function * () {
    this.response.status = 200;
    this.body = 'Demo Application | Query Service operational.';
});

router.get('/data', function * () {
    console.log('Hit the query model get endpoint');
    this.response.status = 200;
    this.body = store.getState();
});

const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLList
} = require('graphql');

let statusEnum = new GraphQLEnumType({
    name: 'status',
    description: 'status of the product',
    values: {
        IN_PROGRESS: {
            value: 'in progress',
        },
        STARTED: {
            value: 'started'
        },
        COMPLETED: {
            value: 'completed'
        }
    }
});

let proposalType = new GraphQLObjectType({
    name: 'Proposal',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'name of the Proposal'
        },
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'id of the Proposal'
        }
    })
});

let productType = new GraphQLObjectType({
    name: 'Product',
    description: 'Product description',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'id of the product'
        },
        status: {
            type: statusEnum
        },
        improvements: {
            type: GraphQLInt
        },
        proposal: {
            type: proposalType,
            resolve: (product, params, source, fieldsAST) => {
                return store.getState().proposals.filter((proposal) => (proposal._id === product.proposal_id))[0];
            }
        }
    })
});

const employeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Product description',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the employee'
        },
        eeid: {
            type: GraphQLInt,
            description: 'Tenant-provided ID of the employee'
        },
        name: {
            type: GraphQLString,
            description: 'Name of the employee'
        },
        phone: {
            type: GraphQLInt,
            description: 'Phone number of the employee'
        },
        email: {
            type: GraphQLString,
            description: 'Email address of the employee'
        }
    })
});

const tenantContactType = new GraphQLObjectType({
    name: 'Contact',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'Name of the contact for the tenant'
        },
        email: {
            type: GraphQLString,
            description: 'Email of the contact for the tenant'
        },
        phone: {
            type: GraphQLInt,
            description: 'Phone number of the contact for the tenant'
        }
    })
})

const tenantType = new GraphQLObjectType({
    name: 'Tenant',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the tenant'
        },
        name: {
            type: GraphQLString,
            description: 'Name of the tenant'
        },
        address: {
            type: GraphQLString,
            description: 'Address of the tenant'
        },
        contact: {
            type: tenantContactType,
            description: 'Main contact for the tenant'
        },
        employees: {
            type: new GraphQLList(employeeType),
            resolve: (tenant, params, source, fieldsAST) => {
                return store.getState().employees.filter((employee) => (employee.tenantID === tenant._id));
            }
        }
    })
});

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'ID of the person'
        },
        first_name: {
            type: GraphQLString,
            description: 'First name of the person'
        },
        last_name: {
            type: GraphQLString,
            description: 'Last name of the person'
        },
        email: {
            type: GraphQLString,
            description: 'Email of the person'
        },
        phone: {
            type: GraphQLInt,
            description: 'Phone number of the person'
        },
        carrier: {
            type: GraphQLString,
            description: 'Cell carrier number of the person'
        }
    })

});

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            products: {
                type: new GraphQLList(productType),
                resolve: function() {
                    return store.getState().products;
                }
            },
            proposals: {
                type: new GraphQLList(proposalType),
                resolve: function(id) {
                    return store.getState().proposals;
                }
            },
            tenants: {
                type: new GraphQLList(tenantType),
                resolve: function() {
                    return store.getState().tenants;
                }
            },
            employees: {
                type: new GraphQLList(employeeType),
                resolve: function() {
                    return store.getState().employees;
                }
            },
            persons: {
                type: new GraphQLList(personType),
                resolve: function() {
                    return store.getState().persons;
                }
            }
        }
    })
});

app.use(mount('/', graphqlHTTP({
    schema: schema,
    graphiql: true
})));

app
    .use(router.routes())
    .use(router.allowedMethods());


//START UP
co(function* () {
	yield co(rebuildQueryModelsFromEvents());

	bus.subscribe('#', function (event) {
		console.log('received event in query service: ', event);
		store.dispatch(event);
	});

	//const port = process.env.PORT || 1339;
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
	});
});

function setupHandlers() {
    // Quit Node Properly with Ctrl+C
    process.on('SIGINT', function() {
        console.log("Gracefully shutting down from SIGINT (Ctrl+C)");
        process.exit();
    });

    // error handler
    app.on('error', function(err) {
        if (process.env.NODE_ENV != 'test') {
            console.log('sent error %s to the cloud', util.inspect(err));
        }
    });
}
