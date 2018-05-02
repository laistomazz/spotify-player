<template>
  <section class="player">
		<h2>Player</h2>
		<p v-if="currentTrack.name">Playing now: {{ currentTrack.name }}</p>
    <button @click="playTrack" :disabled="status === 'playing'">Play</button>
		<button @click="pauseTrack" :disabled="status === 'paused'">Pause</button>
  </section>
</template>

<script>
import config from '../config';

export default {
	name: 'Player',
	data() {
		return {
			status: 'stopped',
		};
	},
	computed: {
		currentTrack() {
			return this.$store.state.currentTrack;
		},
		playlist() {
			return this.$store.state.playlist;
		}
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
			let sdk = document.createElement('script');
			sdk.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
			document.body.appendChild(sdk);
			this.initPlayer();
		},
		initPlayer() {
			window.onSpotifyWebPlaybackSDKReady = () => {
				const token = config.playerToken;
				const player = new Spotify.Player({
					name: 'Web Playback SDK Quick Start Player',
					getOAuthToken: cb => { cb(token); }
				});

				// Error handling
				player.addListener('initialization_error', ({ message }) => { console.error(message); });
				player.addListener('authentication_error', ({ message }) => { console.error(message); });
				player.addListener('account_error', ({ message }) => { console.error(message); });
				player.addListener('playback_error', ({ message }) => { console.error(message); });

				// Playback status updates
				player.addListener('player_state_changed', state => { console.log(state); });

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
		},
		playTrack(trackUri) {
			this.$store.dispatch('PLAY_TRACK', trackUri);
		},
		pauseTrack(trackUri) {
			console.log('doing')
		}
	}
}
</script>

