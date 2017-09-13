// Schema for sample GraphQL server.

// ----------------------
// IMPORTS

// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} from 'graphql';
import Cart from './connector';

// ----------------------

// GraphQL can handle Promises from its `resolve()` calls, so we'll create a
// simple async function that returns a simple message.  In practice, `resolve()`
// will generally pull from a 'real' data source such as a database
async function getMessage() {
  return {
    text: `Hello from the GraphQL server @ ${new Date()}`,
  };
}

// Message type.  Imagine this like static type hinting on the 'message'
// object we're going to throw back to the user
const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'GraphQL server message',
  fields() {
    return {
      text: {
        type: GraphQLString,
        resolve(msg) {
          return msg.text;
        },
      },
    };
  },
});

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'Product item',
  fields() {
    return {
      _id: {
        type: GraphQLID,
      },
      name: {
        type: GraphQLString,
      },
      brand: {
        type: GraphQLString,
      },
      imageUrl: {
        type: GraphQLString,
      },
      price: {
        type: GraphQLString,
      },
      discountPrice: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
    };
  },
})

// Root query.  This is our 'public API'.
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      message: {
        type: Message,
        resolve() {
          return getMessage();
        },
      },
      cartList: {
        type: new GraphQLList(Product),
        resolve() {
          return (Cart.find({}).then((resp) => {
            return resp;
          }));
        },
      },
    };
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields () {
    return {
      addToCart: {
        type: Product,
        args: {
          name: {
            type: GraphQLString,
          },
          brand: {
            type: GraphQLString,
          },
          imageUrl: {
            type: GraphQLString,
          },
          price: {
            type: GraphQLString,
          },
          discountPrice: {
            type: GraphQLString,
          },
          description: {
            type: GraphQLString,
          },
        },
        resolve(root, args) {
          const data = new Cart(args)
          return (data.save().then((resp) => {
            //    pubsub.publish('productAdded', { productAdded: resp });
            return resp;
          }));
        },
      },
      removeFromCart: {
        type: Product,
        args: {
          id: {
            type: GraphQLID,
          },
        },
        resolve(root, args) {
          return (Cart.findByIdAndRemove(args.id).exec().then((resp) => {
            return 'Deleted successfully!';
          }));
        },
      },
      removeAll: {
        type: Product,
        resolve() {
          return (Cart.remove({}).exec().then((resp) => {
            return "Your cart is empty now!";
          }));
        },
      },
    };
  },
});



// The resulting schema.  We insert our 'root' `Query` object, to tell our
// GraphQL server what to respond to.  We could also add a root `mutation`
// if we want to pass mutation queries that have side-effects (e.g. like HTTP POST)
export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
