<template>
  <div class="home">
    <p>Hi! To use this player you need to login first!</p>
    <button @click.once="login()">Let's do this!</button>
  </div>
</template>

<script>
import config from '../config';

export default {
  name: 'Home',
  methods: {
    getUserData(accessToken) {
      this.$store.dispatch('GET_USER_DATA', accessToken)
        .then(() => {
          this.$router.push({ path: '/create-playlist' });
				})
				.catch((err) => {
					console.log('Error retrieving your data. Please try again :/')
				});
    },
    login() {
      const scopes = 'streaming user-read-birthdate user-read-email user-read-private';
      const url = this.getLoginURL(scopes);

      const width = 450;
      const height = 730;
      const left = (screen.width / 2) - (width / 2);
      const top = (screen.height / 2) - (height / 2);
    
      this.listenAuth();
        
      window.open(url,
        'Spotify',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width='
        + width + ', height=' + height + ', top=' + top + ', left=' + left
      );
    },
    getLoginURL(scopes) {
      return `https://accounts.spotify.com/authorize?client_id=${config.clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=token`;
    },
    listenAuth() {
      window.addEventListener('message', (event) => {
        if (typeof event.data === 'string') {
          const hash = JSON.parse(event.data);
          if (hash.type === 'access_token') {
            this.getUserData(hash.access_token);
          }
        }
      }, false);
    }
  }
};
</script>
