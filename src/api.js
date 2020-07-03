export const fetchAlbumsFromServer = () => {
  return fetch(
    'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
  ).then((res) => res.json());
};
