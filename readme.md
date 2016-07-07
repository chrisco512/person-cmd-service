# Project Culture Shock

Culture Shock is an app for aligning and engaging your employees with your cultural values.  It implements Event Sourcing, CQRS, and Microservices. It uses Node.js, Redux,
Mongo, and RabbitMQ.

To setup project, type `./install_all`.  This will install all the npm dependencies for each microservice.

To start project, from the root, type `./start develop`.

To run tests, cd into each service, then type `npm run test`.

## Command Service

Adding new commands, new events, validations, referencing non-aggregate data

### Adding New Commands

In the command service, create a new subfolder in `./commands`

Create a `index.js` file in your new command subfolder. Reference another command's `index.js` file to
build a simple command handler for your command.

Create a new Command Type in `./commands/command_types.js`. These are string constants for each command type your
service can handle.

Create a `{command name}.cmd.validator.js` file. Reference another command's validator file.
Most of the modifications you will need to make involve simply modifying the declarative validations within
the createValidator function parameter object. For each field you care to validate, add a validation function
reference. If you need to add a complex validation (i.e. a foreign key constraint), you may need to create a second
validator (using createValidator) and run the mapped value against that aggregate.  *See `product_start.cmd.validator.js`
for an example*.

Once you've created the validator for your command, you will need to create a corresponding event that will be
emitted after your command succeeds. Create an `{event name}.event.creator.js file. Remember event types should always
be in past tense (i.e. PRODUCT_STARTED, PROPOSAL_CREATED).

### Logging

Logging is useful for debugging and also to inspect what's going on in our services in production. However, we don't always
want everything logged to the console, as it can adversely impact performance and spam the logs with excessive detail.

So we're using `log-level`, which gives us 5 levels of logging: `log.trace(msg)`, `log.debug(msg)`, `log.info(msg)`, `log.warn(msg)`, 
and `log.error(msg)`.  To use in your service, copy over the `log.js` file found in the `person-cmd-service`. You'll note 
that it sets the level to `info` for development purposes, so that anything logged with info, warn, or error levels will 
output to the console. In production, only error level logging should be output to the console.

Keep in mind, the log.error level is intended to log system level errors and not user errors.

Generally, use log.info, and use it sparingly.  If you need to debug something, use log.debug and manually change your log.js 
file to debug while you are debugging. Set it back to info before checking in.  For more info, see [loglevel github](https://github.com/pimterry/loglevel).


### Unit Testing

#### Tools

**Sinon.js**

Mocking Framework - [Homepage](http://sinonjs.org/) - [NPM](https://www.npmjs.com/package/sinon)

**Sinon-Chai**

Extends Chai with assertions for Sinon.js - [Homepage](http://sinonjs.org/) - [NPM](https://www.npmjs.com/package/sinon)

**Proxyquire**

Proxies Node.js require in order to allow overriding dependencies during testing - [Homepage](http://sinonjs.org/) - [NPM](https://www.npmjs.com/package/sinon)

**Mocha**

Javascript test framework running on Node.js - [Homepage](http://sinonjs.org/) - [NPM](https://www.npmjs.com/package/sinon)

**Chai**

BDD / TDD assertion library for node works with any testing framework - [Homepage](http://sinonjs.org/) - [NPM](https://www.npmjs.com/package/sinon)

#### Articles

[Best Practices for Spies, Stubs and Mocks in Sinon.js](https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js)

[The Ultimate Unit Testing Cheat-sheet For Mocha, Chai and Sinon](https://gist.github.com/yoavniran/1e3b0162e1545055429e)

#### Running Tests

While in a service directory, from the terminal, run `npm run test` to run the tests.  You can also `npm run test:watch`
which will rerun the tests automatically when changes are detected. This might not pick up on new files added to the directory.

#### Creating tests

All unit tests should be placed next to the file under test, in the same directory. Name the test exactly the same
as the file under test, except add `spec` just before the `.js` file extension.  So, if you have a `dispatch_event.js`
file, the test would be named `dispatch_event.spec.js`.

#### Notes

_July 6th, 2016_

As of now, person-cmd-service has the most up to date unit testing patterns for command services. You'll notice unit 
tests for the common files such as `dispatch_event.chainable.js` and `publish_event.chainable.js`.  You'll also find 
test examples that make use of `proxyquire` to mock NPM dependencies, such as the `./src/commands/person_create/index.spec.js`
file. The `./src/routes/command.route.spec.js` file shows a good example for testing ES2015 function generators, such
as Koa routes. See links above for more info.

## Query Service
GraphQL, adding new reducers, adding new routes

### Running the system

#### Step 1

##### Windows/Mac
Download the virtualbox image from `https://ulti.box.com/s/y02dt94207nhx72a9blhko77fyug2y7o`
Make sure to create a shared folder on the guest machine from wherever main-repo is on the host machine

IF YOU ARE A COOL PERSON DOWNLOAD THE DOCKER BETA FOR MAC AND WIN10!!!

##### STEP 1.1 - 1.9 FOR VIRTUALBOX ONLY
##### Step 1.5
Make sure the ports (as defined in `docker-compose.develop.yml`) are open on virtualbox

##### Step 1.75
Make a shared folder in the virtualbox settings and then once in your home folder run `mkdir ./culture && sudo mount -t vboxsf <shared folder name> ./culture`

##### Linux
Just go ahead and run the start commands described below

#### Step 2

make sure `./install_all`, `./start`, and `./kongfig_fix/kongfig_fix` all have executable permisions by runnin `chmod +x <file>` on each of them

Start the system

You start the system by running the `start` script with the environment you want to run in

`./start develop` will create a volume for each microservice so you can change the services and have the changes exist in the container as well as the docker host machine NOTE: YOU MUST INSTALL THE NPM PACKAGES FOR EACH SERVICE FOR DEVELOP TO WORK fix for this coming soon. Stay Tuned!!
