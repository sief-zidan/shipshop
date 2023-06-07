const {createSlice} = require('@reduxjs/toolkit');

const UserReducer = createSlice({
  name: 'UserData',
  initialState: {
    userData: {},
    login: false,
    netinfo: true,
    first: false,
  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return {...state, userData: user, login: true};
    },
    removeUser(state, action) {
      return {...state, userData: {}, login: false};
    },
    modifyNetInfo(state, action) {
      return {...state, netinfo: action.payload};
    },
    modifyIsFirst(state, action) {
      return {...state, first: action.payload};
    },
  },
});
export const {setUser, removeUser, modifyNetInfo, modifyIsFirst} =
  UserReducer.actions;
export default UserReducer.reducer;
