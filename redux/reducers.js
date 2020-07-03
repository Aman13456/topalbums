import {DATA_FETCHED, UPDATE_LOADING, TOGGLE_FAVOURITE} from './actionTypes';

const reducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case DATA_FETCHED: {
        const {data} = action;
        return {
          ...state,
          data,
          loading: false,
        };
      }
      case UPDATE_LOADING: {
        const {loading} = action;
        return {
          ...state,
          loading,
        };
      }
      case TOGGLE_FAVOURITE: {
        let {id} = action;
        let {data} = state;
        let newData = [];
        data.forEach((item) => {
          if (item.id === id) {
            newData.push({...item, favourite: !item.favourite});
          } else {
            newData.push(item);
          }
        });
        return {
          ...state,
          data: newData,
        };
      }
    }
  }
  return state;
};

export default reducer;
