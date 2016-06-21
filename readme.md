# Project DECMA

DECMA is a reference architecture that implements Event Sourcing, CQRS, and Microservices. It uses Node.js, Redux,
Mongo, and RabbitMQ.

To setup project, type `npm run setup`.  This will install all the npm dependencies for each microservice.

To start project, from the root, type `npm start`.

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

## Query Service
GraphQL, adding new reducers, adding new routes

# Running the system

# Step 1

## Windows/Mac
Download the virtualbox image from `https://ulti.box.com/s/y02dt94207nhx72a9blhko77fyug2y7o`
Make sure to create a shared folder on the guest machine from wherever main-repo is on the host machine

## Linux
Just go ahead and run the start commands described below

# Step 2
Start the system

You start the system by running the `start` script with the environment you want to run in

`start develop` will create a volume for each microservice so you can change the services and have the changes exist in the container as well as the docker host machine NOTE: YOU MUST INSTALL THE NPM PACKAGES FOR EACH SERVICE FOR DEVELOP TO WORK fix for this coming soon. Stay Tuned!!
`start production` will build all the images with and run them with no file system attachment to the docker host machine

# Linus Torvalds Appreciation Day
## June 21st, 2016
Let this day go down in history as the day all the zombie line endings were eradicated. Praise LF! Long live Linus Torvalds!
