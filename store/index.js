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
