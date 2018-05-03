import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '@/config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTrack: {},
    deviceId: '',
    playlist: [],
    searchResult: {},
    token: '',
    user: {},
  },
  mutations: {
    SET_USER(state, { res }) {
      state.user = res;
    },
    SET_TOKEN(state, { token }) {
      state.token = token;
    },
    SET_SEARCH_RESULT(state, { res }) {
      state.searchResult = res.items;
    },
    ADD_TRACK(state, { track }) {
      const index = state.playlist.findIndex(item => item.id === track.id);
      if (index < 0) {
        state.playlist.push(track);
      } else {
        alert('This track is already on the playlist');
      }
    },
    REMOVE_TRACK(state, { track }) {
      const index = state.playlist.findIndex(item => item.id === track.id);
      if (index > -1) {
        state.playlist.splice(index, 1);
      }
    },
    SET_CURRENT_TRACK(state, { track }) {
      state.currentTrack = track;
    },
    SET_DEVICE_PLAYER(state, { id }) {
      state.deviceId = id;
    },
    SET_PLAYLIST(state, { playlist }) {
      state.playlist = playlist;
    },
  },
  actions: {
    GET_USER_DATA({ commit }, token) {
      return new Promise((resolve, reject) => {
        axios.get(
          'https://api.spotify.com/v1/me',
          { headers: { Authorization: `Bearer ${token}` } },
        ).then(
          (response) => {
            commit('SET_TOKEN', { token });
            commit('SET_USER', { res: response.data });
            resolve();
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    SEARCH({ commit, state }, value) {
      return new Promise((resolve, reject) => {
        axios.get(
          `${config.api}/search?q=${value}&type=track`,
          { headers: { Authorization: `Bearer ${state.token}` } },
        ).then(
          (response) => {
            commit('SET_SEARCH_RESULT', { res: response.data.tracks });
            resolve(response);
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
    UPDATE_PLAYLIST({ commit }, payload) {
      if (payload.type === 'add') {
        commit('ADD_TRACK', { track: payload.track });
      } else {
        commit('REMOVE_TRACK', { track: payload.track });
      }
    },
    SWAP_PLAYLIST({ commit }, playlist) {
      commit('SET_PLAYLIST', { playlist });
    },
    UPDATE_CURRENT_TRACK({ commit }, track) {
      commit('SET_CURRENT_TRACK', { track });
    },
    SAVE_DEVICE_PLAYER({ commit }, id) {
      commit('SET_DEVICE_PLAYER', { id });
    },
    PLAY_TRACK({ state }, trackUri) {
      return new Promise((resolve, reject) => {
        axios.put(
          `${config.api}/me/player/play?device_id=${state.deviceId}&type=track`,
          JSON.stringify({ uris: [trackUri] }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${state.token}`,
            },
          },
        ).then(
          (response) => {
            resolve(response);
          },
          (err) => {
            reject(err.response);
            console.error(err);
          },
        );
      });
    },
  },
});
