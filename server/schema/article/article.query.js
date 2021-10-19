const {
  GraphQLObjectType,
  // GraphQLScalarType,
  // GraphQLUnionType,
  // GraphQLInputObjectType,
  // GraphQLEnumType,
  // GraphQLInterfaceType,
  // GraphQLSchema,
  GraphQLNonNull,
  // GraphQLError,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  // GraphQLFloat,
  // GraphQLDate,
  // GraphQLTime,
  // GraphQLDateTime,
  // GraphQLJSON,
  // GraphQLJSONObject,
} = require('../scalars');
const {
  getArticleByID,
  getListOfArticles,
  getArticlesByCategories,
  searchArticle,
  listAllArticles,
} = require('./article.resolver');

const ArticleType = require('./article.type');

module.exports = new GraphQLObjectType({
  name: 'ArticleQuery',
  fields: {
    getArticleByID: {
      description: 'Retrieves a single article',
      type: ArticleType,
      args: {
        id: {
          description: "The article's mongo ID",
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: getArticleByID,
    },
    getListOfArticles: {
      description: 'Retrives multiple articles by ID',
      type: new GraphQLList(ArticleType),
      args: {
        ids: {
          description: 'The list of user mongo IDs',
          type: new GraphQLNonNull(new GraphQLList(GraphQLID)),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: getListOfArticles,
    },
    getArticlesByCategories: {
      description: 'Retrives multiple articles by categories',
      type: new GraphQLList(new GraphQLList(ArticleType)),
      args: {
        categoryNumbers: {
          description: 'The list of category numbers',
          type: new GraphQLNonNull(new GraphQLList(GraphQLInt)),
        },
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: GraphQLBoolean,
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: getArticlesByCategories,
    },
    listAllArticles: {
      description: 'Lists all articles in descending order of creation time',
      type: new GraphQLList(ArticleType),
      args: {
        onlyPublished: {
          description: 'Whether to only list published articles',
          type: new GraphQLNonNull(GraphQLBoolean),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: listAllArticles,
    },
    searchArticles: {
      description: 'Searches for articles using keywords',
      type: new GraphQLList(ArticleType),
      args: {
        keywords: {
          description: 'The search keywords.',
          type: new GraphQLNonNull(GraphQLString),
        },
        limit: {
          description: 'The number of results to return',
          type: GraphQLInt,
        },
        offset: {
          description: 'The number of results to skip | The paginatiion point',
          type: GraphQLInt,
        },
      },
      resolve: searchArticle,
    },
  },
});
