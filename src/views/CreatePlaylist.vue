<template>
  <main>
    <template v-if="user.id">
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

<style lang="scss">
main {
  width: 100%;
  display: table;
}

main .search {
  width: 30%;
  float: left;
  border-right: 1px solid #c2c2c2;
}

main .playlist {
  width: 70%;
  float: right;
}
</style>

