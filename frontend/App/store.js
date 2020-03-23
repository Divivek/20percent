import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { appReducer, userReducer } from './reducers';
import { feedReducer } from '../Views/ForumFeed/reducers';
import { singleDiscussionReducer } from '../Views/SingleDiscussion/reducers';
import { newDiscussionReducer } from '../Views/NewDiscussion/reducers';
import { adminSettingsReducer } from '../Views/Admin/Settings/reducers';
import { adminInfoReducer } from '../Views/Admin/Dashboard/reducers';
import { userProfileReducer } from '../Views/UserProfile/reducers';

// root reducer for app
const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  feed: feedReducer,
  discussion: singleDiscussionReducer,
  newDiscussion: newDiscussionReducer,
  adminSettings: adminSettingsReducer,
  adminInfo: adminInfoReducer,
  userProfile: userProfileReducer,
});

// dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// application store
let store = createStore(
  rootReducer,
  /* preloaded state, */
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
