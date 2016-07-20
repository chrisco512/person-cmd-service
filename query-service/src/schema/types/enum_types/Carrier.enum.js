const { GraphQLEnumType } = require('graphql');

const CarrierEnum = new GraphQLEnumType({
  name: 'CarrierEnum',
  description: 'Enumeration of the different cell phone carriers we support',
  values: {
    ATT: {
      value: 'AT&T',
      description: 'AT&T (@txt.att.net)'
    },
    T_MOBILE: {
      value: 'T-Mobile',
      description: 'T-Mobile (@tmomail.net)'
    },
    VERIZON: {
      value: 'Verizon',
      description: 'Verizon (@vtext.com)'
    },
    SPRINT: {
      value: 'Sprint',
      description: 'Sprint (@messaging.sprintpcs.com)'
    },
    VIRGIN_MOBILE: {
      value: 'Virgin Mobile',
      description: 'Virgin Mobile (@vmobl.com)'
    },
    TRACFONE: {
      value: 'Tracfone',
      description: 'Tracfone (@mmst5.tracfone.com)'
    },
    METRO_PCS: {
      value: 'Metro PCS',
      description: 'Metro PCS (@mymetropcs.com)'
    },
    BOOST_MOBILE: {
      value: 'Boost Mobile',
      description: 'Boost Mobile (@myboostmobile.com)'
    },
    CRICKET: {
      value: 'Cricket',
      description: 'Cricket (@sms.mycricket.com)'
    },
    NEXTEL: {
      value: 'Nextel',
      description: 'Nextel (@messaging.nextel.com)'
    },
    ALLTEL: {
      value: 'Alltel',
      description: 'Alltel (@message.alltel.com)'
    },
    PTEL: {
      value: 'Ptel',
      description: 'Ptel (@ptel.com)'
    },
    SUNCOM: {
      value: 'Suncom',
      description: 'Suncom (@tms.suncom.com)'
    },
    QWEST: {
      value: 'Qwest',
      description: 'Qwest (@qwestmp.com)'
    },
    US_CELLULAR: {
      value: 'U.S. Cellular',
      description: 'U.S. Cellular (@email.uscc.net)'
    }
  }
});

module.exports = CarrierEnum;
