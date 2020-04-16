import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  PixelRatio,
  Animated,
  Text,
} from 'react-native';
import {gyroscope} from 'react-native-sensors';

class Gyroscope extends Component {
  constructor(props) {
    super(props);

    this.state = {
      y: new Animated.Value(0),
      x: new Animated.Value(0),
      z: new Animated.Value(0),
      aniX: 0,
      aniY: 0,
    };
  }

  componentDidMount() {
    // const subscription = gyroscope.subscribe(({}) => {
    //   this.setState(state => ({
    //     aniX: y + state.aniX,
    //     aniY: x + state.aniY,
    //   }));
    // });
    const subscription = gyroscope.subscribe(({x, y, z, timestamp}) => {
      // this.state.aniX.setValue(x + this.state.aniX);
      // this.state.aniY.setValue();
      // this.state.aniZ.setValue();

      this.setState(state => ({
        y: new Animated.Value(y),
        x: new Animated.Value(x),
        // z: new Animated.Value(z),
        // aniX: y,
        // aniY: x,
      }));
    });

    this.setState({subscription});
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

  render() {
    const {x, y, aniX, aniY} = this.state;
    const movementY = (-aniY / 1000) * 2000;
    const movementX = (-aniX / 1000) * 2000;

    const rotateY = this.state.y.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    const rotateX = this.state.x.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-0deg', '0deg', '0deg'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    const rotateZ = this.state.z.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-40deg', '0deg', '40deg'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });

    return (
      <View style={styles.container}>
        <Animated.View
          // translateX={movementX}
          // translateY={movementY}
          // rotate={movementY + 20}
          style={{
            height: 250,
            width: 350,
            borderRadius: 10,
            backgroundColor: '#e8e8e8',
            // elevation: 100,
            transform: [{rotateX}, {rotateY}],
          }}>
          <Text style={{fontSize: 15}}>Hello</Text>
        </Animated.View>
      </View>
    );
  }
}

export default Gyroscope;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
