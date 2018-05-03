<template>
	<section class="playlist">
		<h2>Your playlist</h2>

		<ul class="playlist__list" v-if="playlist.length > 0">
			<li class="track" v-for="track in playlist" :key="track.id">
				<img class="track__thumb":src="track.album.images[2].url" alt="Album cover">
				<p class="track__name">{{ track.name }}</p>
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

<style lang="scss">
.playlist__list {
	list-style: none;
	padding: 0 10px;
}

.track {
	width: 100%;
	display: table;
	border-bottom: 1px solid #c2c2c2;
	padding-bottom: 10px;
	margin-bottom: 10px;
}

.track__name {
	font-size: 1.4em;
}

.track__thumb {
	float: left;
}

.track button {
	font-size: 1.2em;
}
</style>


