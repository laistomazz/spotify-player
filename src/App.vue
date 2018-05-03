<template>
  <div id="app">
    <h1>Spotify Player</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const hash = {};
      window.location.hash.replace(/^#\/?/, '').split('&').forEach(function(kv) {
        const spl = kv.indexOf('=');
        if (spl != -1) {
          hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl+1));
        }
      });
      if (hash.access_token) {
        window.opener.postMessage(JSON.stringify({
          type: 'access_token',
          access_token: hash.access_token,
          expires_in: hash.expires_in || 0,
        }), window.location.href);
        window.close();
      }
    }
  }
}
</script>


<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 62.5%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app h1 {
  padding: 20px 0;
  border-bottom: 1px solid #c2c2c2;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-size: 2em;
}

#app button {
  background-color: #2c3e50;
  color: #fff;
  border: 0;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 700;
  transition: background-color 300ms;
  cursor: pointer;

  &:hover{
    background-color: #1c2125;
  }
}

#app p {
  margin-bottom: 10px;
  font-size: 1.4em;
}
</style>
