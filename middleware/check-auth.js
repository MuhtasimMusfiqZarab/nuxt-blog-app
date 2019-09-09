//dispatching initAuth action to persist data whenver this middleware is run
// need to include this middleware to all the necessary files
//process.client is env variable provided by nuxt

export default function(context) {
  //inside the action we dispatch we are calling localstore to fetch saved token (but inittially middleware runs on the server)==> so localStorage would be undefined.. thus we need to check if this middleware is running on the client
  // and only if its the case then we would dispatch this action
  context.store.dispatch("initAuth", context.req); // we can forward the req(part of the context here) to dispatch
  // context.req  is always null on the client
}
