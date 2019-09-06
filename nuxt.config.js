// this is used whenever we run => npm run dev /build command for deployment

//universal means we are taking advantage of nuxt's pre-render capabilities (run views on the server already)
export default {
  mode: "universal",
  /*
   ** Headers of the page (here some general data that should be written in th head of every single rendered page)
   */
  //head configuration is using vue meta package behind the scene
  head: {
    //package simply is the package.json (can change the name here)
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      //href="https://fonts.googleapis.com/css?family=Hepta+Slab&display=swap" rel="stylesheet" to global cdn

      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Hepta+Slab&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color (color while refreshing/loadiing (hex code))
   */
  loading: {
    color: "#fa923f",
    height: "4px",
    failedColor: "yellow",
    duration: 5000
  }, //loading : false ; to disable the color
  //loading indicator would work only for single page application
  loadingIndicator: {
    name: "circle",
    color: "#fa923f"
  },
  /*
   ** Global CSS(for every singe page)
   ** alternative of  this is layout specific styling what we are using now (which is also global for a given layout)
   */
  css: ["~assets/styles/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"], //registering the plugins
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules (lets us add convinient features in nuxt
   ** we use 3rd party modules, dont create our own coz its complex)
   */
  modules: ["@nuxtjs/axios"], //is doesn't replace our default axios inport in our app
  //now we can write axios config after writting inside of the module
  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-e3c31.firebaseio.com",
    credentials: false //not try to pass any cookies to the backend as we are having a restful api
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here (change build process, nextgen to currentGen js, minification )
     */
    extend(config, ctx) {}
  },
  //################### OTHER SETTINGS APPLIED BY ME
  // dev: true // development mode or not
  //we can aceess this url from anywhere of the file using process.env.baseURL
  env: {
    //my environment variable injected into the project
    //process.env.BASE_URL  will be taken from real node server
    baseURL: process.env.BASE_URL || "https://nuxt-blog-e3c31.firebaseio.com",
    fbAPIKey: "AIzaSyBgPy3XUNBRq-7BZvGCnXHUMsogEXuqMds"
  },
  generate: {
    // to change the way nuxt statically generates pages
  },
  // rootDir: "/my-app/" //to make my-app folder as the root directory
  // overwrite the setting of nuxt router
  // can add middleware in all of the routes
  router: {
    // middleware: "log",
    // base: "/my-app/" // the root folder to serve
    extendRoutes(routes, resolve) {
      //allows us to programmetically add our own route
      routes.push({
        // redirect to homepage for all unknown path
        path: "*",
        component: resolve(__dirname, "pages/index.vue") //(__dirname: directory Im currently in, path you wanna load)
      });
    }
  },

  //animation during page changes (transition can be string/object)
  transition: {
    name: "fade", //used from inside of global css
    mode: "out-in"
  }
};
