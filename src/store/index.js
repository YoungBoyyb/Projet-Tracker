import { createStore, createLogger } from "vuex";
import { v4 as uuid } from "@lukeed/uuid";
import * as TaskService from "../services/TaskService.js";

const store = createStore({
  state() {
    return {
      tasks: null,
      areTasksLoading: false,
    };
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_ARE_TASKS_LOADING(state, bool) {
      state.areTasksLoading = bool;
    },
    ADD_TASK(state, newTask) {
      state.tasks.unshift(newTask);
    },
    DELETE_TASK(state, taskIndex) {
      state.tasks.splice(taskIndex, 1);
    },
  },
  actions: {
    async fetchAllTasks({ commit }) {
      commit("SET_ARE_TASKS_LOADING", true);
      try {
        const allTasks = await TaskService.getAll();
        commit("SET_TASKS", allTasks);
        commit("SET_ARE_TASKS_LOADING", false);
      } catch (e) {
        commit("SET_ARE_TASKS_LOADING", false);
        throw e;
      }
    },

    async updateAllTasks({ state }) {
      await TaskService.updateAll(state.tasks);
    },

    async addTask({ commit }, { name, startTime }) {
      const newTask = {
        id: uuid(),
        name,
        startTime,
        endTime: Date.now(),
      };
      commit("ADD_TASK", newTask);
    },

    async deleteTask({ state, commit }, taskID) {
      // Récupération de l'index de la tâche
      let taskIndex = null;
      state.tasks.forEach((task, index) => {
        if (task.id === taskID) {
          taskIndex = index;
        }
      });
      // Suppression de la tâche
      commit("DELETE_TASK", taskIndex);
    },
  },
  plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;
