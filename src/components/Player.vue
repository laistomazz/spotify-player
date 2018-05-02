<template>
  <section class="player">
		<h2>Player</h2>
		<p v-if="currentTrack.name">{{ status === 'playing' ? 'Playing now:' : ''}} {{ currentTrack.name }}</p>
    <button
			@click="toggleTrack"
			v-if="status !== ''"
		>
			{{ this.status === 'play' ? 'Pause' : 'Play' }}
		</button>
  </section>
</template>

<script>
import config from '../config';

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
				window.player = new Spotify.Player({
					name: 'Web Playback SDK Quick Start Player',
					getOAuthToken: cb => { cb(this.token); }
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
			player.pause().then(() => {
				this.status = 'pause';
			});
		}
	}
}
</script>

