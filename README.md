## TopAlbums ##

> Displays the top 100 albums from Apple iTunes (<a href="https://itunes.apple.com/us/rss/topalbums/limit=100/json" target="_blank">`API`</a>).
> Built for both web and mobile platform. Most of the code is common for both platforms.
> You can mark any album as favourite. The albums are realtime searchable. Does network detection. Will auto-fetch the albums when connects to network.

### Clone ###

- Clone this repo to your local machine using https://github.com/Aman13456/topalbums

### Run Instructions ###

- First install all the dependencies.
```shell
$ npm install
``` 
#### Android ####
- For running in debug mode, run metro bundler and create debug build:
```shell
$ react-native start
$ react-native run-android
``` 
- For running in release mode:
```shell
$ react-native run-android --variant=release
``` 

#### Web ####
- For running a development server:
```shell
$ npm run start-web
``` 
- For creating a production build:
```shell
$ npm run build-web
``` 

