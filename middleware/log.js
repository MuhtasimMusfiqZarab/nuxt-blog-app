// middleware is just a function receiving context as a argument (as seen in asyncData() & nuxtServerInit() action)
// this executes before a given page is loadedo be exported as a default
//need to export
// runs both on the server(on the first load) & on the client (clicking around)
// just like asyncData() it works on page components
export default function(context) {
  // if async code is run then need to retuen a promise here (no need return in synchronous code)
  console.log("[Middleware] The log middleware is running");
}
