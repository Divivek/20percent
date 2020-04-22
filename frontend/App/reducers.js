import {
  START_FETCHING_FORUMS,
  STOP_FETCHING_FORUMS,
  FETCHING_FORUMS_SUCCESS,
  FETCHING_FORUMS_FAILURE,
  UPDATECURRENTFORUM,
  START_FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  START_FETCHING_SETTINGS,
  FETCHING_SETTINGS_SUCCESS,
  FETCHING_SETTINGS_FAILURE
} from './constants';

import LogoImage from 'SharedStyles/logo.png';

const initialState = {
  fetchingForums: false,
  forums: null,
  currentForum: 'general',
  error: false,
  settings: {
    boardName: '20Percent',
    boardLogoImage: LogoImage
  }
};

/**
 * reducer for top level app state
 */
export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_FORUMS:
      return Object.assign({}, state, {
        fetchingForums: true,
      });

    case STOP_FETCHING_FORUMS:
      return Object.assign({}, state, {
        fetchingForums: false,
      });

    case FETCHING_FORUMS_SUCCESS:
      return Object.assign({}, state, {
        forums: action.payload,
        fetchingForums: false,
        error: false,
      });

    case FETCHING_FORUMS_FAILURE:
      return Object.assign({}, state, {
        fetchingForums: false,
        error: 'Unable to fetch forums',
      });

    case UPDATECURRENTFORUM:
      return Object.assign({}, state, {
        currentForum: action.payload,
      });

    case START_FETCHING_SETTINGS:
      return Object.assign({}, state, {
        fetchingSettings: true,
        error: null
      });

    case FETCHING_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        fetchingSettings: false,
        settings: action.payload,
        error: null
      });

    case FETCHING_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        fetchingSettings: false,
        error: 'Something went wrong while fetching the current admin settings'
      });

    default:
      return state;
  }
};

/**
 * reducer for user
 */
const initialUserState = {
  fetchingUser: true,
  authenticated: false,
  error: null,
  _id: null,
  name: null,
  email: null,
  username: null,
  avatarUrl: null,
  githubUrl: null,
  githubLocation: null,
  githubBio: null,
  role: null,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case START_FETCHING_USER:
      return Object.assign({}, state, {
        fetchUser: true,
      });

    case FETCHING_USER_SUCCESS:
      const {
        _id,
        name,
        username,
        avatarUrl,
        email,
        githubBio,
        githubUrl,
        githubLocation,
        role,
      } = action.payload;

      return Object.assign({}, state), {
        fetchingUser: false,
        authenticated: true,
        error: null,
        _id,
        name,
        username,
        avatarUrl,
        email,
        githubBio,
        githubUrl,
        githubLocation,
        role,
      };

    case FETCHING_USER_FAILURE:
      return Object.assign({}, initialUserState, {
        fetchingUser: false,
        error: 'Unable to fetch user!',
      });

    default:
      return state;
  }
};
