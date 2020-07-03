import {UPDATE_LOADING, DATA_FETCHED, TOGGLE_FAVOURITE} from './actionTypes';
import {extractRequiredData} from '../utils';
import {fetchAlbumsFromServer} from '../api';

export const fetchAlbums = () => {
  return (dispatch) => {
    dispatch(updateLoading(true));
    fetchAlbumsFromServer()
      .then((res) => {
        let data = extractRequiredData(res);
        dispatch({
          type: DATA_FETCHED,
          data,
        });
      })
      .catch((err) => {
        dispatch(updateLoading(false));
      });
  };
};

export const updateLoading = (loading) => {
  return {
    type: UPDATE_LOADING,
    loading,
  };
};

export const toggleFavourite = (id) => {
  return {
    type: TOGGLE_FAVOURITE,
    id,
  };
};
