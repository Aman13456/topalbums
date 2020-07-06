import React from 'react';
import {
  Text,
  View,
  FlatList,
  Animated,
  TextInput,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Image from './Image';
import {searchIcon} from '../images';
import {filterSearchData} from '../utils';
import ListItem from './ListItem';

const HEADER_HEIGHT = 100;
const SEARCH_BAR_HEIGHT = 50;
const SEARCH_BAR_MARGIN = 8;
const SEARCH_BAR_EFFECTIVE_HEIGHT = SEARCH_BAR_HEIGHT + SEARCH_BAR_MARGIN;

const AnimatedList = Animated.createAnimatedComponent(FlatList);

class AlbumList extends React.Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    this.state = {
      listData: props.data,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        0,
        HEADER_HEIGHT - SEARCH_BAR_EFFECTIVE_HEIGHT,
      ),
    };
  }

  onChangeSearchText = (text) => {
    this.setState({
      searchText: text,
      listData: filterSearchData(text, this.props.data),
    });
  };

  renderItem = ({item}) => {
    return <ListItem data={item} />;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let filteredData = filterSearchData(prevState.searchText, nextProps.data);
    return {listData: filteredData};
  }

  render() {
    const {listData} = this.state;
    let headerTranslate = this.state.clampedScroll.interpolate({
      inputRange: [0, HEADER_HEIGHT - SEARCH_BAR_EFFECTIVE_HEIGHT],
      outputRange: [0, -(HEADER_HEIGHT - SEARCH_BAR_EFFECTIVE_HEIGHT)],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.headerContainer,
            {transform: [{translateY: headerTranslate}]},
          ]}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.titleText}>Top 100 Albums</Text>
          </View>
          <View style={styles.searchBarContainer}>
            <View style={styles.textInputContainer}>
              <View style={styles.searchIconContainer}>
                <Image resizeMode="contain" source={searchIcon} />
              </View>
              <TextInput
                placeholder={'Type to search by Album Name'}
                style={styles.textInput}
                onChangeText={this.onChangeSearchText}
              />
            </View>
          </View>
        </Animated.View>

        <AnimatedList
          data={listData}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollAnim}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          ListHeaderComponent={<View style={{height: HEADER_HEIGHT}} />}
          ListEmptyComponent={
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No Items Found!</Text>
            </View>
          }
        />
      </View>
    );
  }
}

AlbumList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      artist: PropTypes.string,
      itemCount: PropTypes.string,
      releaseDate: PropTypes.string,
      albumCover: PropTypes.string,
      favourite: PropTypes.bool,
    }),
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    backgroundColor: 'black',
  },
  headerContainer: {
    position: 'absolute',
    height: HEADER_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'black',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    padding: 8,
    color: 'white',
  },
  searchBarContainer: {
    height: SEARCH_BAR_HEIGHT,
  },
  textInputContainer: {
    marginHorizontal: 8,
    marginBottom: SEARCH_BAR_MARGIN,
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 8,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
    paddingHorizontal: 4,
  },
  noDataContainer: {
    padding: 4,
    alignItems: 'center',
  },
  noDataText: {
    color: 'grey',
    fontSize: 25,
  },
});

export default AlbumList;
