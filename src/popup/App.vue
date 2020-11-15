<template>
  <div class="wrapper">
    <Header />
    <MainPanel />
  </div>
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
    MainPanel,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans", sans-serif;
}

:root {
  --green: rgb(28, 92, 35);
  --grey: rgb(100, 100, 100);
}

img {
  width: 3rem;
  height: 3rem;
}

.wrapper {
  width: 100%;
  scrollbar-width: thin;
  overflow-x: hidden;
}

#top {
  display: block;
  background-color: rgb(240, 240, 240);
  border-bottom: 0.25rem solid rgb(28, 92, 35);
}
</style>
