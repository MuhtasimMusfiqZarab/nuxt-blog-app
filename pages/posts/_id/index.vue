<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">{{loadedPost.updatedDate | date }}</div>
        <div class="post-detail">{{loadedPost.author}}</div>
      </div>
      <div class="post-content">{{loadedPost.content}}</div>
    </section>
    <section class="post-feedback">
      <p>
        Send me the feedback on the post to
        <a
          href="mailto:musfiqzarab@gmail.com"
        >musfiqzarab@gmail.com</a>
      </p>
    </section>
  </div>
</template>



<script>
export default {
  asyncData(context) {
    //checking from generate property inside of nuxt config (static generation command)
    if (context.paload) {
      //for only generating static pages this if block will run
      //then return different data to be merged with our data of the component (no need to make new http request)
      return {
        loadedPost: context.payload.postData
      };
    }
    //callback is not needed as we are using promise
    return context.app.$axios
      .$get(
        //context.params.id because the folder is named _id
        "/post/" + context.params.id + ".json"
      )
      .then(data => {
        //merging with component data (loadedData)
        return {
          loadedPost: data
        };
      })
      .catch(e => context.error(e));
    //id is fetched from route params (context.params.id === route.params.id)
  },
  //overwriting configurtion
  head: {
    title: "A Blog Post"
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: column;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>