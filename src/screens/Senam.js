import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '../global';
import Video from 'react-native-video';
import video_senam from '../assets/senam.mp4';

export default function () {
  return (
    <View style={{...globalStyles.container, backgroundColor: '#000'}}>
      <Video
        source={video_senam}
        ref={ref => {
          this.player = ref;
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    </View>
  );
}
