<template>
  <Fragment>
    <Header />
    <MainPanel />
  </Fragment>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "@/components/Header.vue";
import MainPanel from "@/components/MainPanel.vue";

export default {
  name: "App",
  components: {
    Header,
    MainPanel
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

img {
  width: 3rem;
  height: 3rem;
}

#top {
  background-color: rgb(240, 240, 240);
  border-bottom: 0.25rem solid rgb(28, 92, 35);
}
</style>
