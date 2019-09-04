<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  asyncData(context) {
    // this keyword does not work as expected in async data coz async data runs before this component is created
    // we need to give asyncData the idea about when we are done (otherwise imediately returns the finished page
    // one solution is to return a promise ( thus it waits for the promise to be resolved and gives the result)
    // the syntax is return new Promise() which is to wrap the whole setTimeout
    // other one is to use callback (in aync data we get two arguments (context, callback)), execute callback when we are done
    // execution of callback method tells the async method that we are done
    // we use callback instead of return
    return new Promise(resolve => {
      setTimeout(() => {
        //if first arg is not null then it returns error autometically
        resolve({
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
      //once resolved then marge data with other component data (inside then)==>(map the data as needed using new obj or return the object as a whole)
      // catching errors inside of promise
      // then handles resolve , catch handles reject
    })
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(e => console.log(new Error()));
  },

  //loading async data to the store
  created() {
    this.$store.dispatch("setPosts", this.loadedPosts);
    console.log(this.$store.getters.loadedPosts);
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-lists {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>