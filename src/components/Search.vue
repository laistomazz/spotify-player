<template>
	<section class="search">
		<h2>Find a song:</h2>
		<input type="text" v-model="searchKey">

		<ul class="playlist__list" v-if="searchResult.length > 0">
			<li class="track" v-for="track in searchResult" :key="track.id">
				<img class="track__thumb" :src="track.album.images[2].url" alt="Album cover">
				<p class="track__name">{{ track.name }}</p>
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

