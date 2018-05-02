<template>
  <main>
    <template v-if="user.id">
      <h2>Welcome, {{ user.display_name }}</h2>
      <p>Let's create your playlist!</p>
      <Player />
      <Search />
      <Playlist />
    </template>
    <p v-else>Ops! You need to <router-link to="/">login first!</router-link></p>
  </main>
</template>

<script>
import Search from '../components/Search';
import Playlist from '../components/Playlist';
import Player from '../components/Player';

export default {
  name: 'CreatePlaylist',
  components: {
    Search,
    Playlist,
    Player,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
}
</script>

<style  lang="scss">
main {
  width: 100%;
  display: table;
}

main .search {
  width: 30%;
  float: left;
}

main .playlist {
  width: 70%;
  float: right;
}
</style>

