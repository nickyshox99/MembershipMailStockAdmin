// Store module for user registration data (email and password)
const state = {
  email: null,
  password: null,
  sourceUserId: null,
};

const getters = {
  getEmail: (state) => state.email,
  getPassword: (state) => state.password,
  getSourceUserId: (state) => state.sourceUserId,
  hasRegistrationData: (state) => !!(state.email && state.password),
};

const mutations = {
  SET_REGISTRATION_DATA(state, { email, password, sourceUserId }) {
    state.email = email;
    state.password = password;
    if (sourceUserId) {
      state.sourceUserId = sourceUserId;
    }
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  SET_PASSWORD(state, password) {
    state.password = password;
  },
  SET_SOURCE_USER_ID(state, sourceUserId) {
    state.sourceUserId = sourceUserId;
  },
  CLEAR_REGISTRATION_DATA(state) {
    state.email = null;
    state.password = null;
    state.sourceUserId = null;
  },
};

const actions = {
  // บันทึกข้อมูลการลงทะเบียน
  setRegistrationData({ commit }, payload) {
    commit('SET_REGISTRATION_DATA', payload);
  },
  
  // บันทึก email
  setEmail({ commit }, email) {
    commit('SET_EMAIL', email);
  },
  
  // บันทึก password
  setPassword({ commit }, password) {
    commit('SET_PASSWORD', password);
  },
  
  // บันทึก sourceUserId
  setSourceUserId({ commit }, sourceUserId) {
    commit('SET_SOURCE_USER_ID', sourceUserId);
  },
  
  // ล้างข้อมูล
  clearRegistrationData({ commit }) {
    commit('CLEAR_REGISTRATION_DATA');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
