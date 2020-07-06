import React from 'react';
import {
  Text,
  View,
  Image as RNImage,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {toggleFavourite} from '../redux/actions';
import {favouriteWhiteIcon, favouriteWhiteSelectedIcon} from '../images';
import Image from './Image';
import {connect} from 'react-redux';

class ListItem extends React.PureComponent {
  onFavouriteClick = () => {
    this.props.dispatch(toggleFavourite(this.props.data.id));
  };

  render() {
    let {data} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.coverImageContainer}>
          <RNImage
            style={styles.coverImage}
            resizeMode={'cover'}
            source={{uri: data.albumCover}}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText} numberOfLines={2}>
            {data.name}
          </Text>
          <Text
            style={[styles.secondaryText, {paddingTop: 2}]}
            numberOfLines={1}>
            {data.artist}
          </Text>
          <View style={styles.releaseDateContainer}>
            <Text style={styles.secondaryText}>{data.itemCount} Items</Text>
            <Separator />
            <Text style={styles.secondaryText}>{data.releaseDate}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favouriteContainer}
          onPress={this.onFavouriteClick}>
          <Image
            source={
              data.favourite ? favouriteWhiteSelectedIcon : favouriteWhiteIcon
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

ListItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    artist: PropTypes.string,
    itemCount: PropTypes.string,
    releaseDate: PropTypes.string,
    albumCover: PropTypes.string,
    favourite: PropTypes.bool,
  }),
};

class Separator extends React.Component {
  render() {
    return <View style={styles.separator}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    marginHorizontal: 4,
    marginVertical: 2,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  coverImageContainer: {
    justifyContent: 'center',
    padding: 4,
  },
  coverImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: 'white',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 4,
  },
  nameText: {
    fontSize: 16,
    color: 'white',
  },
  secondaryText: {
    color: 'grey',
  },
  releaseDateContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 2,
  },

  favouriteContainer: {
    justifyContent: 'center',
    padding: 8,
  },
  separator: {
    height: 3,
    width: 3,
    borderRadius: 2,
    backgroundColor: 'grey',
    marginHorizontal: 6,
    marginBottom: -2,
  },
});

export default connect()(ListItem);
