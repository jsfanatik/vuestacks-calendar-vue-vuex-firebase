import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  mutations: {
    setEvents: (state, events) => {
      state.events = events
    }
  },
  actions: {
    setEvents: async context => {
      let snapshot = await db.collection('calEvent').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      context.commit('setEvents', events)
    }
  }
})
