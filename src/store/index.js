import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    URL: 'http://localhost:3000/todos',
    todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    storeTodo(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id);
      if(index >= 0) {
        state.todos.splice(index, 1, payload);
      } else {
        state.todos.push(payload);
      }
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(todo => todo.id === id);

      if(index >= 0) {
        state.todos.splice(index, 1);
      }
    }
  },
  actions: {
    getTodos({ commit, state }) {
      return axios.get(`${state.URL}`)
                .then((response)=> {
                  commit('storeTodos', response.data)
                })
    },
    addTodo({ commit, state }, data) {
      return axios.post(`${state.URL}`, data)
        .then((response) => {
          commit('storeTodo', response.data);
        })
    },
    updateTodo({ commit, state }, { id, data }) {
      return axios.put(`${state.URL}/${id}`, data)
              .then((response) => {
                commit('storeTodo', response.data);
              })
    },
    deleteTodo({ commit, state }, id) {
      return axios.delete(`${state.URL}/${id}`)
              .then(() => {
                commit('deleteTodo', id);
              })
    }
  },
  getters: {
  },
  modules: {
  },
})