<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  // special property on the pages components (only) that nuxt will execute on the server
  // server waits for it to finish and then return it to the client (hence we will get a pre-rendered complete page back to the client)
  // this also replaces the data() as well as created() in the client side (this executes on the server)
  // we cant use normal data then which will override the asyncData & can get unwanted effect
  asyncData(context, callback) {
    console.log("async data is loaded");
    // this keyword does not work as expected in async data coz async data runs before this component is created
    // we need to give asyncData the idea about when we are done (otherwise imediately returns the finished page
    // one solution is to return a promise ( thus it waits for the promise to be resolved and gives the result)
    // the syntax is return new Promise() which is to wrap the whole setTimeout
    // other one is to use callback (in aync data we get two arguments (context, callback)), execute callback when we are done
    // execution of callback method tells the async method that we are done
    // we use callback instead of return
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
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
        ]
      });
    }, 1500);
  }
};
</script>


<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-image: url("~assets/images/main-page-background.jpg");
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>