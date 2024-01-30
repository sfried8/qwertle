import schemes from '@/colorschemes'
import { createStore } from 'vuex'
import AccessibilityModal from '@/components/modals/AccessibilityModal.vue';
import DonateModal from '@/components/modals/DonateModal.vue';
import HowToPlay from '@/components/modals/HowToPlay.vue';
import StatisticsModal from '@/components/modals/StatisticsModal.vue';
import ChangesModal from '@/components/modals/ChangesModal.vue';
import NewChangesModal from '@/components/modals/NewChangesModal.vue';
import SideMenu from '@/components/SideMenu.vue';

const modals = {
  'how-to-play': HowToPlay,
  'statistics': StatisticsModal,
  'donate': DonateModal,
  'accessibility': AccessibilityModal,
  'sidemenu': SideMenu,
  'changes': ChangesModal,
  'newchanges': NewChangesModal
}
export default createStore({
  state() {
    return {
      colorschemename: 'stoplight',
      currentlyShownModalName: null,
      guesses: [],
      answer: null,
      mostRecentFinishedDay: new Date('01/01/1970'),
      gameState: "IN_PROGRESS",
      seenHowToPlay: false,
      penultimateSeenVersion: "0.0",
      lastSeenVersion: "0.0",
      stats: {
        guesses: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, fail: 0 },
        currentStreak: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        maxStreak: 0,
        winPercentage: 0,
      },
    }
  },
  getters: {
    colorscheme(state) { return schemes[state.colorschemename] },
    currentlyShownModal(state) {
      return modals[state.currentlyShownModalName]

    }
  },
  mutations: {
    initialize_store(state) {
      if (localStorage.getItem('qwertleData2')) {
        // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('qwertleData2')))
        );
      } else if (localStorage.getItem('qwertleData')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('qwertleData')))
        )
      }
    },
    set_current_scheme(state, newSchemeName) {
      if (schemes[newSchemeName]) {
        state.colorschemename = newSchemeName
      }
    },
    show_modal(state, modal) {
      if (modals[modal]) {
        state.currentlyShownModalName = modal
      }
    },
    hide_modal(state) {
      state.currentlyShownModalName = null
    },
    set_guesses(state, guesses) {
      state.guesses = guesses
    },
    set_answer(state, answer) {
      state.answer = answer
    },
    set_most_recent_finished_day(state, day) {
      state.mostRecentFinishedDay = day
    },
    set_stats(state, stats) {
      state.stats = stats
    },
    set_game_state(state, gameState) {
      state.gameState = gameState
    },
    set_seen_how_to_play(state) {
      state.seenHowToPlay = true
    },
    set_last_seen_version(state, version) {
      if (state.lastSeenVersion != version) {
        state.penultimateSeenVersion = state.lastSeenVersion
        state.lastSeenVersion = version
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
