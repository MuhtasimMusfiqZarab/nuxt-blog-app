//This is needed first
import Vue from "vue";

// registering core components (components that we constantly reuse
import AppControlInput from "@/components/UI/AppControlInput";
import AppButton from "@/components/UI/AppButton";
import PostList from "@/components/Posts/PostList";

//making it global component without inporting them on the pages
Vue.component("AppControlInput", AppControlInput);
Vue.component("AppButton", AppButton);
Vue.component("PostList", PostList);

//adding plugins here does not only make the trick (we have to register this on the config file)
