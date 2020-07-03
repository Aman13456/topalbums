import React from 'react';

export default class Image extends React.Component {
  render() {
    const {source, style, resizeMode} = this.props;
    let imageStyle = {...style};
    if (resizeMode) {
      imageStyle['objectFit'] = resizeMode;
    }
    return <img src={source} alt={"icon"} style={imageStyle} />;
  }
}
