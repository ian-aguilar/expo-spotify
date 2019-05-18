import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { colors, device, fonts, gStyle, images } from '../api';

// components
import LinearGradient from '../components/LinearGradient';
import LineItemSong from '../components/LineItemSong';
import TouchText from '../components/TouchText';

// data
import albums from '../mockdata/albums';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null,
      downloaded: false,
      title: null
    };

    this.toggleDownloaded = this.toggleDownloaded.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    // const albumTitle = navigation.getParam('title', 'ALBUM NOT FOUND?!');
    const albumTitle = navigation.getParam('title', 'Extraordinary Machine');

    this.setState({
      album: albums[albumTitle] || null,
      title: albumTitle
    });
  }

  toggleDownloaded(val) {
    this.setState({
      downloaded: val
    });
  }

  render() {
    const { screenProps } = this.props;
    const { changeSong } = screenProps;
    const { album, downloaded, title } = this.state;

    // album data not set?
    if (album === null) {
      return (
        <View style={[gStyle.container, gStyle.flexCenter]}>
          <Text style={{ color: colors.white }}>{`Album: ${title}`}</Text>
        </View>
      );
    }

    return (
      <View style={gStyle.container}>
        {/*
      <View
        style={{
          backgroundColor: 'red',
          height: 89,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 40
        }}
      />
      */}
        <View style={styles.containerFixed}>
          <View style={styles.containerLinear}>
            <LinearGradient fill={album.backgroundColor} />
          </View>
          <View style={styles.containerImage}>
            <Image source={images[album.image]} style={styles.image} />
          </View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
            {album.title}
          </Text>
          <Text style={styles.albumInfo}>
            {`Album by ${album.artist} · ${album.released}`}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          style={styles.containerScroll}
        >
          <View style={styles.containerSticky}>
            <View style={styles.containerShuffle}>
              {/*
            <LinearGradient fill={colors.black20} height={27} />
            */}
              <TouchText
                onPress={() => null}
                style={styles.btn}
                styleText={styles.btnText}
                text="Shuffle Play"
              />
            </View>
          </View>
          <View style={styles.containerSongs}>
            <View style={styles.row}>
              <Text style={styles.downloadText}>
                {downloaded ? 'Downloaded' : 'Download'}
              </Text>
              <Switch
                onValueChange={val => this.toggleDownloaded(val)}
                value={downloaded}
              />
            </View>

            {album.tracks &&
              album.tracks.map((track, index) => (
                <LineItemSong
                  downloaded={downloaded}
                  key={index.toString()}
                  onPress={changeSong}
                  songData={{
                    album: album.title,
                    artist: album.artist,
                    image: album.image,
                    length: track.seconds,
                    title: track.title
                  }}
                />
              ))}
          </View>
          <View style={gStyle.spacer128} />
        </ScrollView>
      </View>
    );
  }
}

Album.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerFixed: {
    alignItems: 'center',
    paddingTop: device.iPhoneX ? 94 : 50,
    position: 'absolute',
    width: '100%'
  },
  containerLinear: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6
  },
  image: {
    height: 148,
    marginBottom: 16,
    width: 148
  },
  title: {
    color: colors.white,
    fontFamily: fonts.spotifyBold,
    fontSize: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
    textAlign: 'center'
  },
  albumInfo: {
    color: colors.greyInactive,
    fontFamily: fonts.spotifyRegular,
    fontSize: 12,
    marginBottom: 48
  },
  containerScroll: {
    paddingTop: 116
  },
  containerSticky: {
    marginTop: device.iPhoneX ? 238 : 194
  },
  containerShuffle: {
    alignItems: 'center',
    height: 27,
    shadowColor: colors.blackBg,
    shadowOffset: { height: -20, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20
  },
  btn: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 27,
    height: 54,
    top: -27,
    width: 200
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.spotifyBold,
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  containerSongs: {
    alignItems: 'center',
    backgroundColor: colors.blackBg
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%'
  },
  downloadText: {
    color: colors.white,
    fontFamily: fonts.spotifyBold,
    fontSize: 18
  }
});

export default Album;
