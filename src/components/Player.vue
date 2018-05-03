<template>
  <section class="player">
    <h2>Player</h2>
    <p v-if="currentTrack.name">
      {{ status === 'play' ? 'Playing now:' : ''}} {{ currentTrack.name }}</p>
    <p v-else>Choose a song to play</p>
    <button
      @click="toggleTrack"
      v-if="status !== ''"
    >
      {{ this.status === 'play' ? 'Pause' : 'Play' }}
    </button>
    <button
      @click="playNext"
      v-if="hasNext > -1"
    >
      Next
    </button>
  </section>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
      status: '',
      player: {},
    };
  },
  computed: {
    currentTrack() {
      return this.$store.state.currentTrack;
    },
    playlist() {
      return this.$store.state.playlist;
    },
    token() {
      return this.$store.state.token;
    },
    hasNext() {
      const current = this.playlist.findIndex(item => item.id === this.currentTrack.id);
      if (current > -1 && current < this.playlist.length - 1) {
        return current + 1;
      }
      return -1;
    },
  },
  mounted() {
    this.injectSpotifyPlayer();
  },
  watch: {
    currentTrack(value) {
      this.playTrack(value.uri);
    },
  },
  methods: {
    injectSpotifyPlayer() {
      const sdk = document.createElement('script');
      sdk.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
      document.body.appendChild(sdk);
      this.initPlayer();
    },
    initPlayer() {
      /* eslint-disable no-undef, camelcase */
      window.onSpotifyWebPlaybackSDKReady = () => {
        window.player = new Spotify.Player({
          name: 'Web Playback SDK Quick Start Player',
          getOAuthToken: (cb) => { cb(this.token); },
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });

        // Playback status updates
        player.addListener('player_state_changed', (state) => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          this.$store.dispatch('SAVE_DEVICE_PLAYER', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
      };
      /* eslint-enable */
    },
    toggleTrack() {
      if (this.status !== 'play') {
        this.playTrack(this.currentTrack.uri);
      } else {
        this.pauseTrack();
      }
    },
    playTrack(trackUri) {
      this.$store.dispatch('PLAY_TRACK', trackUri);
      this.status = 'play';
    },
    pauseTrack() {
      // eslint-disable-next-line no-undef
      player.pause().then(() => {
        this.status = 'pause';
      });
    },
    playNext() {
      this.$store.dispatch('UPDATE_CURRENT_TRACK', this.playlist[this.hasNext]);
    },
  },
};
</script>

<style>
.player {
  padding: 20px 0;
  border-bottom: 1px solid #c2c2c2;
  margin-bottom: 20px;
}
</style>

