import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {fetchAlbums} from '../redux/actions';
import Loader from './Loader';
import AlbumList from './AlbumList';
import NoInternet from './NoInternet';
import Retry from './Retry';
import SplashScreen from 'react-native-splash-screen';

class Home extends React.Component {
  state = {
    isConnectedToInternet: true,
  };

  fetchData = () => {
    const {dispatch} = this.props;
    dispatch(fetchAlbums());
  };

  onConnectionChanged = (connectionState) => {
    if (
      this.state.isConnectedToInternet !== connectionState.isInternetReachable
    ) {
      if (connectionState.isInternetReachable) {
        let {data, loading} = this.props;
        if (!data.length && !loading) {
          this.fetchData();
        }
      }
      this.setState({
        isConnectedToInternet: connectionState.isInternetReachable,
      });
    }
  };

  componentDidMount() {
    this.unsubscribeNetworkListener = NetInfo.addEventListener(
      this.onConnectionChanged,
    );
    NetInfo.fetch().then((connectionState) => {
      let isInternetReachable = connectionState.isInternetReachable;
      this.setState({isConnectedToInternet: isInternetReachable});
      if (isInternetReachable) {
        this.fetchData();
      }
      Platform.OS === 'android' && SplashScreen.hide();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let {data: newData, loading: newLoading} = this.props;
    let {data: oldData, loading: oldLoading} = prevProps;
    if (!oldData.length && newData.length) {
      this.unsubscribeNetworkListener && this.unsubscribeNetworkListener();
      this.unsubscribeNetworkListener = void 0;
    } else if (
      !newData.length &&
      oldLoading &&
      !newLoading &&
      this.state.isConnectedToInternet
    ) {
      if (!this.retriedOnce) {
        this.fetchData();
        this.retriedOnce = true;
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribeNetworkListener && this.unsubscribeNetworkListener();
  }

  render() {
    let {loading, data} = this.props;
    let {isConnectedToInternet} = this.state;
    if (data.length) {
      return <AlbumList data={data} />;
    } else if (loading) {
      return <Loader />;
    } else if (!isConnectedToInternet) {
      return <NoInternet />;
    } else {
      return <Retry />;
    }
  }
}

let mapStateToProps = (state) => ({
  loading: state.loading,
  data: state.data,
});

export default connect(mapStateToProps)(Home);
