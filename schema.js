const axios = require('axios');
const { GraphQLObjectType, GraphQLInt, GraphQLString,  GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');

const IPGeoType = new GraphQLObjectType({
    name: 'IPGeo',
    fields: () => ({
        continent: { type: GraphQLString },
        continentCode: { type: GraphQLString },
        country: { type: GraphQLString },
        countryCode: { type: GraphQLString},
        region: { type: GraphQLString },
        regionName: { type: GraphQLString },
        city: { type: GraphQLString },
        district: { type: GraphQLString },
        zip: { type: GraphQLString },
        lat: { type: GraphQLString },
        lon: { type: GraphQLString },
        timezone: { type: GraphQLString },
        offset: { type: GraphQLInt },
        currency: { type: GraphQLString },
        isp: { type: GraphQLString },
        org: { type: GraphQLString },
        as: { type: GraphQLString },
        asname: { type: GraphQLString },
        mobile: { type: GraphQLBoolean },
        proxy: { type: GraphQLBoolean },
        hosting: { type: GraphQLBoolean },
        query: { type: GraphQLString }
    })
});



// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        lookup: {
            type: IPGeoType,
            args: {
                query: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios.get(`http://ip-api.com/json/${args.query}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,mobile,proxy,hosting,query`)
                .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});