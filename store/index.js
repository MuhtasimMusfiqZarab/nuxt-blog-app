// veux comes bundled with nuxt js
import Vuex from "vuex";

// function to create store
// need a function to represent the store (coz it should be callable with nuxt to be executed on the server to setup the store)
const createStore = () => {
  // returning function instead of object, thus every users gets his own store (because if returning object => all users of our app would get the same instance => because on the server where node js runs we have plane object stored , we will always get that object for every user )
  return new Vuex.Store({
    // initial
    state: {
      loadedPosts: []
    },
    actions: {
      //special action to run it once in the server
      // this action will auto dispatched be nuxt
      //payload is always context
      //general data has been fetched only one time and added to the store
      nuxtServerInit({ commit }, context) {
        // if (!process.client) {
        //   // console.log(context.req);
        // }

        // must need to return if executing async action (else we dont need to return)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // commit just the array of objects
            commit("setPosts", [
              {
                id: "1",
                title: " First Post",
                previewText: "This is the first post",
                thumbnail:
                  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              },
              {
                id: "2",
                title: " Second Post",
                previewText: "This is the second post",
                thumbnail:
                  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              },
              {
                id: "3",
                title: " Third Post",
                previewText: "This is the third post",
                thumbnail:
                  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              }
            ]);
            resolve(); // to mark that i am done (different in nuxtServerInit than normal)
          }, 1000);
        });
      },

      // commit is inside of vuexContext.commit
      setPosts({ commit }, posts) {
        //payload of posts is optional
        commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    },
    mutations: {
      //posts is the payload
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    }
  });
};

//must need to export it
export default createStore;

//nuxt will autometically inject the store to all our components

// heres special method for vuex store which would be executed one time only on the server (nuxt server init method)
