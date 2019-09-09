// veux comes bundled with nuxt js
import Vuex from "vuex";
// function to create store
// need a function to represent the store (coz it should be callable with nuxt to be executed on the server to setup the store)
const createStore = () => {
  // returning function instead of object, thus every users gets his own store (because if returning object => all users of our app would get the same instance => because on the server where node js runs we have plane object stored , we will always get that object for every user )
  return new Vuex.Store({
    // initial
    state: {
      loadedPosts: [],
      token: null
    },
    actions: {
      //special action to run it once in the server
      // this action will auto dispatched be nuxt
      //payload is always context
      //general data has been fetched only one time and added to the store
      nuxtServerInit({ commit }, context) {
        //fetching data & initializing the store with it
        //must return as using async request
        // we can access injected axios module from anywhere using ( this.$axios) but only here we use (context.app.$axios)
        return context.app.$axios //baseUrl is set inside this module
          .$get("/post.json")
          .then(data => {
            //axios module directly gives us data from res obj
            //transform data object into array before storing (here objects are named with a key)
            const postArray = []; //initialize array
            for (const key in data) {
              postArray.push({ ...data[key], id: key }); //storing with inidividual key (store the key inside  as id)
            }
            // console.log(postArray);

            //storing inside of vuex
            commit("setPosts", postArray);
          }) //store inside of vuex
          .catch(e => context.error(e));
      },

      // commit is inside of vuexContext.commit
      setPosts({ commit }, posts) {
        //payload of posts is optional
        commit("setPosts", posts);
      },
      //doing addPost mutation
      // implementing async/await
      async addPost({ commit }, postData) {
        const createdPost = { ...postData, updatedDate: new Date() };
        // its better to async call from here)
        try {
          //postData object is coming from the form
          const data = await this.$axios.$post("/post.json", createdPost);
          //savig in vuex
          commit("addPost", { ...createdPost, id: data.name }); //name is the id of firebase, res.data is from axios)
          this.$router.push("/admin"); //redirect (this might not work but worked well)
        } catch (err) {
          throw new Error(err);
        }
      },
      //commiting editPost mutation
      // implemeting promise chaining
      editPost({ commit, state }, editedPost) {
        //param is postId because folder is named _postId
        //updating the data // but getting the params from vue router
        //return the promise & waiting it to finish to redirect later
        return this.$axios //saving in database
          .$put(
            "/post/" + editedPost.id + ".json?auth=" + state.token,
            editedPost
          )
          .then(res =>
            //saving to vuex
            commit("editPost", editedPost)
          )
          .catch(e => console.log(e));
      },
      authenticateUser({ commit, dispatch }, authData) {
        //initially this is loginURL
        let authURL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fbAPIKey;

        //if it is a signup
        if (!authData.isLogin) {
          //change the url to signUp url
          authURL =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.fbAPIKey;
        }
        //we would send http req after the form submission
        //sending data with the 2nd object arg (see the firebase auth api)
        //returning this to redirect from auth page
        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            //saving token to store
            commit("setToken", result.idToken);
            //saving token to localstorage
            localStorage.setItem("token", result.idToken);
            //new date().getTime gives current time in milisecond
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + result.expiresIn * 1000
            );
            //dispatch the action when setting up the token
            dispatch("setLogoutTimer", result.expiresIn * 1000);
          })
          .catch(e => console.log(e));
      },
      //clearing the token after an hour coz it wont work after that
      setLogoutTimer({ commit }, duration) {
        setTimeout(() => {
          commit("clearToken");
        }, duration);
      },
      // checking saved token inside local storage
      initAuth(vuexContext) {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("tokenExpiration");

        if (new Date().getTime() > +expirationDate || !token) {
          //+ string to a number
          // that means that this is expired or dont have the token
          return;
        }

        //need to set the logout timer too
        vuexContext.commit(
          "setLogoutTimer",
          +expirationDate - new Date().getTime() //+ for turning string into a number
        );
        //saving from storge to vuex
        vuexContext.commit("setToken", token);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      //checking authentication
      isAuthenticated(state) {
        return state.token != null;
      }
    },
    mutations: {
      //posts is the payload
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },

      // as nuxtServerInit runs once and then the store is not changed (as we did not write syncData()/fetch() inside the components where the data are added/edited)so we need to add and edit post to vuex after each subsequent changes are made
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        //1st find the existed post index in the state array
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        // replacing the element with the new element
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      // clear token as it would not work after an hour
      clearToken(state) {
        state.token = null;
      }
    }
  });
};

//must need to export it
export default createStore;

//nuxt will autometically inject the store to all our components

// heres special method for vuex store which would be executed one time only on the server (nuxt server init method)
