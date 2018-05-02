<template>
	<section class="search">
		<h2>Find a song:</h2>
		<input type="text" v-model="searchKey">

		<ul v-if="searchResult.length > 0">
			<li v-for="track in searchResult" :key="track.id">
				<img :src="track.album.images[2].url" alt="Album cover">
				{{ track.name }}
				<button @click="addTrack(track)">Add to playlist</button>
			</li>
		</ul>
	</section>
</template>

<script>
import _ from 'lodash';

export default {
	name: 'Search',
	data() {
		return {
			searchKey: '',
		}
	},
	watch: {
		searchKey() {
			this.searchSong();
		},
	},
	computed: {
		searchResult() {
			return this.$store.state.searchResult;
		}
	},
	methods: {
		searchSong: _.debounce(function() {
			if (this.searchKey.length > 3) {
			this.$store.dispatch('SEARCH', this.searchKey)
				.catch((err) => {
					alert(`Wow, something wrong happened :( ${err}`)
				})
			}
		}, 500),
		addTrack(value) {
			const payload = {
				track: value,
				type: 'add',
			}
			this.$store.dispatch('UPDATE_PLAYLIST', payload);
		}
	}
}
</script>

