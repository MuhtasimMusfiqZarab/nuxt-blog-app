// veux comes bundled with nuxt js
import Vuex from "vuex";
import axios from "axios";

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
        //fetching data & initializing the store with it
        //must return as using async request
        return axios
          .get("https://nuxt-blog-e3c31.firebaseio.com/post.json")
          .then(res => {
            //transform data object into array before storing (here objects are named with a key)
            const postArray = []; //initialize array
            for (const key in res.data) {
              postArray.push({ ...res.data[key], id: key }); //storing with inidividual key (store the key inside  as id)
            }
            console.log(postArray);

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
          const result = await axios.post(
            "https://nuxt-blog-e3c31.firebaseio.com/post.json",
            createdPost
          );
          //savig in vuex
          commit("addPost", { ...createdPost, id: result.data.name }); //name is the id of firebase, res.data is from axios)
          this.$router.push("/admin"); //redirect (this might not work but worked well)
        } catch (err) {
          throw new Error(err);
        }
      },
      //commiting editPost mutation
      // implemeting promise chaining
      editPost({ commit }, editedPost) {
        //param is postId because folder is named _postId
        //updating the data // but getting the params from vue router
        //return the promise & waiting it to finish to redirect later
        return axios //saving in database
          .put(
            "https://nuxt-blog-e3c31.firebaseio.com/post/" +
              editedPost.id +
              ".json",
            editedPost
          )
          .then(res =>
            //saving to vuex
            commit("editPost", editedPost)
          )
          .catch(e => console.log(e));
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
      }
    }
  });
};

//must need to export it
export default createStore;

//nuxt will autometically inject the store to all our components

// heres special method for vuex store which would be executed one time only on the server (nuxt server init method)
