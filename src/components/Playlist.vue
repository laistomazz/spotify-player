<template>
	<section class="playlist">
		<h2>Your playlist</h2>

		<ul v-if="playlist.length > 0">
			<li v-for="track in playlist" :key="track.id">
				<img :src="track.album.images[2].url" alt="Album cover">
				{{ track.name }}
				<button @click="removeTrack(track)">Remove from playlist</button>
				<button @click="playTrack(track)">Play song</button>
			</li>
		</ul>
		<p v-else>Your playlist is empty. Use the search to find new songs!</p>
	</section>
</template>

<script>
export default {
	name: 'Playlist',
	computed: {
		playlist() {
			return this.$store.state.playlist;
		}
	},
	methods: {
		removeTrack(value) {
			const payload = {
				track: value,
				type: 'remove',
			}
			this.$store.dispatch('UPDATE_PLAYLIST', payload);
		},
		playTrack(track) {
			this.$store.dispatch('UPDATE_CURRENT_TRACK', track);
		}
	}
}
</script>

