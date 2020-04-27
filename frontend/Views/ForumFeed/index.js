import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import {
  getDiscussions,
  getPinnedDiscussions,
  updateSortingMethod,
} from './actions';

import NewDiscussionButton from 'Components/NewDiscussionButton';
import FeedBox from 'Components/FeedBox';
import SearchBar from 'Components/SearchBar';
import MapView from 'Components/MapView';

import {
  getDefaultCenter,
  getBrowserLocation
} from '../../Utils/geolocation';

import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

class ForumFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: {},
      mapCenterStateSet: false
    };

  }

  componentDidMount() {
    const {
      currentForumId,
      getDiscussions,
      getPinnedDiscussions,
    } = this.props;

    // get the discussions and pinned discussions
    getDiscussions(currentForumId());
    getPinnedDiscussions(currentForumId());

    this.setMapLocation();
  }

  componentDidUpdate(prevProps) {
    const {
      currentForum,
      currentForumId,
      getDiscussions,
      getPinnedDiscussions,
    } = this.props;

    // get the discussions again
    // if the forum didn't matched
    if (prevProps.currentForum !== currentForum) {
      const feedChanged = true;
      getDiscussions(currentForumId(), feedChanged);
      getPinnedDiscussions(currentForumId(), feedChanged);
    }
  }

  setMapLocation() {
    getBrowserLocation(position => {
      this.setState({
        mapCenter: {
          lat: position.lat,
          lng: position.lng
        },
        mapCenterStateSet: true
      });
    }, error => {
      this.setState({
        mapCenter: getDefaultCenter(),
        mapCenterStateSet: true
      });
    });
  }

  handleSortingChange(newSortingMethod) {
    const {
      currentForumId,
      getDiscussions,
      updateSortingMethod,
      sortingMethod,
    } = this.props;

    if (sortingMethod !== newSortingMethod) {
      updateSortingMethod(newSortingMethod);
      getDiscussions(currentForumId(), false, true);
    }
  }

  render() {
    const {
      currentForum,
      discussions,
      fetchingDiscussions,
      pinnedDiscussions,
      fetchingPinnedDiscussions,
      sortingMethod,
      error,
      searchInput,
      filteredDiscussions,
      authenticated
    } = this.props;

    let {
      mapCenter,
      mapCenterStateSet
    } = this.state;

    if (error) {
      return (
        <div className={classnames(styles.errorMsg)}>
          {error}
        </div>
      );
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        <Helmet><title>{`20Percent <|> ${currentForum}`}</title></Helmet>

        <div className={classnames(appLayout.primaryContent, styles.forumFeedContainer)}>
          <div className={styles.feedBoxContainer}>
            <div>
                <h1> Stay home save lives || Spend 20% more save economy</h1>
                <h2>Spend 20% more and bring our economy back on track quickly</h2>
                <h5>We all did our part during the COVID-19 outbreak by staying home. Now that is quarantine is lifting, we have more responsibilities to make our contributions back into society.
                    As the world reopens, we can help to quickly get back to normal by spending 20% more every time possible.</h5>
                <h5> Use the discussion fourms above to exchange your thoughts with like-minded people. Share your contributions with #20%More.
                    
                </h5>
            </div>
            <FeedBox
              type='pinned'
              loading={fetchingPinnedDiscussions}
              discussions={pinnedDiscussions}
              currentForum={currentForum}
            />

            <SearchBar />

            <FeedBox
              type='general'
              loading={fetchingDiscussions}
              discussions={searchInput ? filteredDiscussions : discussions}
              currentForum={currentForum}
              onChangeSortingMethod={this.handleSortingChange.bind(this)}
              activeSortingMethod={sortingMethod}
            />

            <div className={styles.newDiscussionBtn}>
              <NewDiscussionButton currentForum={currentForum} authenticated={authenticated}/>
            </div>
          </div>

          <MapView
            loading={fetchingDiscussions}
            pinnedDiscussions={pinnedDiscussions}
            discussions={discussions}
            currentForum={currentForum}
            center={mapCenter}
            mapCenterStateSet={mapCenterStateSet}
            forumFeedMapViewContainer
            zoom={12}
          />

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    currentForum: state.app.currentForum,
    currentForumId: () => {
      const currentForumObj = _.find(state.app.forums, { forum_slug: state.app.currentForum });
      if (currentForumObj) return currentForumObj._id;
      else return null;
    },
    fetchingDiscussions: state.feed.fetchingDiscussions,
    discussions: state.feed.discussions,
    fetchingPinnedDiscussions: state.feed.fetchingPinnedDiscussions,
    sortingMethod: state.feed.sortingMethod,
    pinnedDiscussions: state.feed.pinnedDiscussions,
    error: state.feed.error,
    searchInput: state.feed.searchInput,
    filteredDiscussions:state.feed.filteredDiscussions,
    authenticated: state.app.authenticated
  }; },
  (dispatch) => { return {
    getDiscussions: (currentForumId, feedChanged, sortingMethod, sortingChanged) => { dispatch(getDiscussions(currentForumId, feedChanged, sortingMethod, sortingChanged)); },
    getPinnedDiscussions: (currentForumId, feedChanged) => { dispatch(getPinnedDiscussions(currentForumId, feedChanged)); },
    updateSortingMethod: (method) => { dispatch(updateSortingMethod(method)); },
  }; }
)(ForumFeed);
