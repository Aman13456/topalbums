import {UPDATE_LOADING, DATA_FETCHED, TOGGLE_FAVOURITE} from './actionTypes';
import {extractRequiredData} from '../utils';

export const fetchAlbums = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LOADING,
      loading: true,
    });
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then((res) => res.json())
      .then((res) => {
        let data = extractRequiredData(res);
        dispatch({
          type: DATA_FETCHED,
          data,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_LOADING,
          loading: false,
        });
      });
  };
};

export const toggleFavourite = (id) => {
  return {
    type: TOGGLE_FAVOURITE,
    id,
  };
};
