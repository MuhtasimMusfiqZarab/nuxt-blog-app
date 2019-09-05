<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{loadedPost.title}}</h1>
      <div class="post-details">
        <div class="post-detail">{{loadedPost.updatedDate}}</div>
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
  // inside of async ==> we get this.$route.params(params object holds all route parameters) by using context.params (or context.route.params)
  // we also know that this keyword can't be used here
  // for individual data we still always perform async because it might need some extra data
  // we can only use asyncData() inside of a paged component
  //async data will be executed on the server wehn we load it the first time or on client on subsiquent navigation & action
  // this is powerfull for page specific data

  //---------fetch vs asyncData
  //* async merge the data in data property, fetch stores the data on the store (using commit inside it)
  // better option than fetch is to use nuxtServerInit()

  // ----------------This one uses promise (example code)
  // code can be found here: https://codesandbox.io/s/kind-dubinsky-y57g1

  //--------------Later version----------------------
  asyncData(context, callback) {
    //data must wait till it finish loading on the server before it is send to client (thus must use callback or promise)
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: "1",
          title: " First Post (id " + context.params.id + ")",
          previewText: "This is the first post",
          author: "Muhtasim Musfiq",
          updatedDate: new Date(),
          content: "Dummy text, not the preview text",
          thumbnail:
            "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        }
      });
    }, 1000);
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
    flex-direction: row;
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