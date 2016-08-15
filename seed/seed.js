const { url } = require('./config');
const axios = require('axios');
const co = require('co');

const fetchQuery = ( query ) =>
  axios.post( url, { query } ).then( res => {
    if( res.data.errors) { console.log('🔥'); console.log(res.data.errors); }
    return res.data.data.mutation;
   });

const TENANT_CREATE = ({ name, address, contactName, contactEmail, contactPhone }) => (`
  mutation {
    mutation: TENANT_CREATE(
  		name: "${name}"
      address: "${address}"
      contact: {
        name: "${contactName}"
        email: "${contactEmail}"
        phone: ${contactPhone}
      }
    ) {
      _id
      name
      address
      contact {
        name
        email
        phone
      }
    }
  }
`);
const tenants = [
  {
    name: 'Ultimate Software',
    address: '2000 Ultimate way',
    contactName: 'UltiMatt',
    contactEmail: 'UltiMatt@ultilabs.xyz',
    contactPhone: 3332221111
  }
];


const PERSON_CREATE = ({ email, carrier, phone, firstName, lastName }) => (`
  mutation {
    mutation: PERSON_CREATE(
      email: "${email}"
      carrier: ${carrier}
      phone: ${phone}
      firstName: "${firstName}"
      lastName: "${lastName}"
    ) {
      _id
      firstName
      lastName
      email
      phone
      carrier
    }
  }
`);
const persons = [
  {
    email: 'benjamin_diuguid@us.com',
    carrier: 'VERIZON',
    phone: 3523523333,
    firstName: 'Benjamin',
    lastName: 'Diuguid'
  },
  {
    email: 'james_mclaughlin@us.com',
    carrier: 'ATT',
    phone: 4054054444,
    firstName: 'James',
    lastName: 'McLaughlin'
  },
  {
    email: 'chris_cordle@us.com',
    carrier: 'T_MOBILE',
    phone: 1231235555,
    firstName: 'Chris',
    lastName: 'Cordle'
  },
  {
    email: 'alicia_rodriguez@us.com',
    carrier: 'SPRINT',
    phone: 3213217777,
    firstName: 'Alicia',
    lastName: 'Rodriguez'
  },
  {
    email: 'the_fake_ben_botwin@not_actually_a_ben.noob',
    carrier: 'TRACFONE',
    phone: 7787781234,
    firstName: '[FAKE] Ben',
    lastName: 'Botwin'
  },
  {
    email: 'joseph_cutrono@us.com',
    carrier: 'BOOST_MOBILE',
    phone: 7897892222,
    firstName: 'Joseph',
    lastName: 'Cutrono'
  },
  {
    email: 'cason_clagg@us.com',
    carrier: 'CRICKET',
    phone: 4564567777,
    firstName: 'Cason',
    lastName: 'Clagg'
  },
  {
    email: 'carolina_collepardo@us.com',
    carrier: 'NEXTEL',
    phone: 1231234444,
    firstName: 'Carolina',
    lastName: 'Collepardo'
  }
];


const USER_CREATE = ({ email, role, tenantId, auth0Id, personId, companyIdentifier }) => (`
  mutation {
    mutation: USER_CREATE(
      email: "${email}"
      role: "${role}"
      tenantId: "${tenantId}"
      auth0Id: "${auth0Id}"
      personId: "${personId}"
      companyIdentifier: "${companyIdentifier}"
    ) {
      _id
      role
      tenantId
      auth0Id
      person {
        _id
      }
      companyIdentifier
      email
    }
  }
`);
let users = [
  {
    email: 'benjamin_diuguid@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'james_mclaughlin@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'chris_cordle@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'alicia_rodriguez@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'joseph_cutrono@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'the_fake_ben_botwin@not_actually_a_ben.noob',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'cason_clagg@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  },
  {
    email: 'carolina_collepardo@us.com',
    role: 'employee',
    tenantId: 'REPLACE',
    auth0Id: 'FAKE LOL',
    personId: 'REPLACE',
    companyIdentifier: 'ALSO FAKE LOL'
  }
];


const PILLAR_CREATE = ({ name, tenantId }) => (`
  mutation {
    mutation: PILLAR_CREATE(
      name: "${name}"
      isDeleted: false
      tenantId: "${tenantId}"
    ) {
      _id
      tenantId
      name
      isDeleted
    }
  }
`);
let pillars = [
  {
    name: 'DO THE RIGHT THING!',
    tenantId: 'HAI PLZ REPLACE ME'
  },
  {
    name: 'JUST DO IT!',
    tenantId: 'HAI PLZ REPLACE ME'
  },
  {
    name: 'PERSONS FIRST!',
    tenantId: 'HAI PLZ REPLACE ME'
  }
];

const POINT_INCREMENT = ({ userId, count, date }) => {
  return (`
    mutation {
      mutation: POINT_INCREMENT(
        userId: "${userId}"
        count: ${count}
        date: "${date}"
      ) {
        userId
        count
        date
      }
    }
  `);
}
let points = [
  {
    userId: 'REPLACE',
    count: 100,
    date: "1-20-2016"
  },
  {
    userId: 'REPLACE',
    count: 201,
    date: "2-21-2016"
  },
  {
    userId: 'REPLACE',
    count: 200,
    date: "2-1-2015"
  },
  {
    userId: 'REPLACE',
    count: 301,
    date: "3-2-2014"
  },
  {
    userId: 'REPLACE',
    count: 404,
    date: "4-2-2016"
  },
  {
    userId: 'REPLACE',
    count: 500,
    date: "5-2-2016"
  },
  {
    userId: 'REPLACE',
    count: 667,
    date: "6-3-2016"
  },
  {
    userId: 'REPLACE',
    count: 700,
    date: "7-3-2016"
  }
];


// ==========================================================================
// -----------------------     START UP     ---------------------------------
// ==========================================================================
co(function* () {

  try {

    // ***************  TENANTS  ***************
    const tenantQueries = tenants.map(TENANT_CREATE);
    const tenantMutations = yield Promise.all( tenantQueries.map(fetchQuery) );
    const tenantId = tenantMutations[0]._id;


    // ***************  PILLARS  ***************
    pillars = pillars.map(p => { p.tenantId = tenantId; return p; });
    const pillarQueries = pillars.map(PILLAR_CREATE);
    const pillarMutations = yield Promise.all( pillarQueries.map(fetchQuery) );


    // ***************  PERSONS  ***************
    const personQueries = persons.map(PERSON_CREATE);
    const personMutations = yield Promise.all( personQueries.map(fetchQuery) );


    // ***************  USERS  ***************
    users = users.map( u => {
      u.personId = personMutations.filter(p => p.email === u.email )[0]._id;
      u.tenantId = tenantId;
      return u;
    });
    const userQueries = users.map(USER_CREATE);
    const userMutations = yield Promise.all( userQueries.map(fetchQuery) );


    // ***************  POINTS  ***************
    points = points.concat(points).concat(points).concat(points).concat(points).concat(points)

    points = points.map( (p, index) => {
      p.userId = userMutations[index % users.length]._id; // Assign points randomly :)
      return p;
    });
    const pointQueries = points.map(POINT_INCREMENT);
    const pointMutations = yield Promise.all( pointQueries.map(fetchQuery) );

    console.log(' 👍  Success 👍 ');

  } catch(e) {
    console.log('💥 ERROR');
    console.log(e);
    console.log(e.response.data);
  }
});
