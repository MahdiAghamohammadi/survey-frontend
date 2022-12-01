import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    dashboard: {
      loading: false,
      data: {},
    },
    answers: {
      loading: false,
      data: {},
    },
    answersDetails: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    currentSurvey: {
      data: {},
      loading: false,
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notification: {
      show: false,
      type: "success",
      message: "",
    },
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.data.user);
        commit("setToken", data.data.token);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.data.user);
        commit("setToken", data.data.token);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((res) => {
        commit("logout");
        return res;
      });
    },
    getUser({ commit }) {
      return axiosClient.get("/user").then((res) => {
        console.log(res);
        commit("setUser", res.data);
      });
    },
    getDashboardData({ commit }) {
      commit("dashboardLoading", true);
      return axiosClient
        .get(`/dashboard`)
        .then((res) => {
          commit("dashboardLoading", false);
          commit("setDashboardData", res.data);
          return res;
        })
        .catch((error) => {
          commit("dashboardLoading", false);
          return error;
        });
    },
    getAllAnswers({ commit }) {
      commit("AnswersLoading", true);
      return axiosClient
        .get(`/show-all-answers`)
        .then((res) => {
          commit("AnswersLoading", false);
          commit("setAnswersData", res.data);
          return res;
        })
        .catch((error) => {
          commit("AnswersLoading", false);
          return error;
        });
    },
    getAllAnswersById({ commit }, id) {
      commit("AnswersLoading", true);
      return axiosClient
        .get(`/survey/${id}/answers`)
        .then((res) => {
          commit("AnswersLoading", false);
          commit("setAnswersData", res.data);
          return res;
        })
        .catch((error) => {
          commit("AnswersLoading", false);
          return error;
        });
    },
    getAnswersDetails({ commit }, { sid, aid }) {
      commit("AnswersDetailsLoading", true);
      return axiosClient
        .get(`/survey/${sid}/answer/${aid}`)
        .then((res) => {
          commit("AnswersDetailsLoading", false);
          commit("setAnswersDetailsData", res.data);
          return res;
        })
        .catch((error) => {
          commit("AnswersDetailsLoading", false);
          return error;
        });
    },
    saveSurvey({ commit, dispatch }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }

      return response;
    },
    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    getSurveys({ commit }, { url = null } = {}) {
      commit("setSurveysLoading", true);
      url = url || "/survey";
      return axiosClient.get(url).then((res) => {
        commit("setSurveysLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },
    deleteSurvey({ dispatch }, id) {
      return axiosClient.delete(`/survey/${id}`).then((res) => {
        dispatch("getSurveys");
        return res;
      });
    },
    saveSurveyAnswer({ commit }, { surveyId, answers }) {
      return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },
    AnswersLoading: (state, loading) => {
      state.answers.loading = loading;
    },
    setAnswersData: (state, data) => {
      state.answers.data = data;
    },
    AnswersDetailsLoading: (state, loading) => {
      state.answersDetails.loading = loading;
    },
    setAnswersDetailsData: (state, data) => {
      state.answersDetails.data = data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    notify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;
