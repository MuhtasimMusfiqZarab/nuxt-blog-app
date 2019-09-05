<template>
  <div>
    <!-- this listens to events emited from TheHeader -->
    <!-- if sidenavToggle event is emited from header then change the data (displaySidenav) what it is currently not -->
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <!-- This is open or not is known from emited events from the Header -->
    <!-- according to the show prop value, sideNav is toggled -->
    <TheSideNav :show="displaySidenav" @close="displaySidenav = false" />
    <nuxt />
  </div>
</template>

<script>
// The component we use only once should have a The at the begining
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";

export default {
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    };
  }
};
</script>

<style>
/* using global cdn(google font) for the whole document importing inside of config file  */
html {
  font-family: "Hepta Slab", serif;
}

body {
  margin: 0;
}
</style>
