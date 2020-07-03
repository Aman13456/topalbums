export const extractRequiredData = (fetchedData) => {
  let data = [];
  if (
    fetchedData &&
    fetchedData.feed &&
    fetchedData.feed.entry &&
    Array.isArray(fetchedData.feed.entry) &&
    fetchedData.feed.entry.length
  ) {
    for (let row of fetchedData.feed.entry) {
      let {
        'im:name': {label: name} = {},
        'im:itemCount': {label: itemCount} = {},
        'im:artist': {label: artist} = {},
        'im:releaseDate': {attributes: {label: releaseDate} = {}} = {},
        'im:image': images = [],
        id: {attributes: {'im:id': id} = {}} = {},
      } = row;
      let [{label: albumCover} = {}] = images;
      data.push({
        id,
        name,
        artist,
        itemCount,
        releaseDate,
        albumCover,
        favourite: false,
      });
    }
  }
  return data;
};

export const filterSearchData = (searchText, totalData) => {
  if (searchText) {
    searchText = searchText.toLowerCase();
    return totalData.filter((item) => {
      let albumName = item.name.toLowerCase();
      return albumName.indexOf(searchText) !== -1;
    });
  }
  return totalData;
};
