import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CustomCrousal = () => {
  const [ani] = useState(new Animated.Value(-1));
  const images = [
    require('../assets/images/ChallengePhoto-Charles.jpg'),
    require('../assets/images/ChallengePhoto-Diana.jpg'),
    require('../assets/images/ChallengePhoto-Jasmine.jpg'),
    require('../assets/images/ChallengePhoto-Kate.jpg'),
    require('../assets/images/ChallengePhoto-Katherine.jpg'),
    require('../assets/images/ChallengePhoto-Loveth.jpg'),
    require('../assets/images/ChallengePhoto-Frank.jpg'),
    require('../assets/images/ChallengePhoto-Harry.jpeg'),
    require('../assets/images/ChallengePhotoAlice.jpg'),
    require('../assets/images/ChallengePhoto-Becca.jpg'),
  ];
  return (
    <View style={styles.container}>
      <AnimatedFlatList
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: ani}}}], {
          useNativeDriver: true,
        })}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: (width * 0.2) / 2,
        }}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={width * 0.8}
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Animated.View
              style={[
                {
                  paddingHorizontal: 10,
                  height: height * 0.4,
                  width: width * 0.8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'visible',
                  transform: [
                    {
                      scale: ani.interpolate({
                        inputRange: [
                          (index - 1) * width * 0.8,
                          index * width * 0.8,
                          (index + 1) * width * 0.8,
                        ],
                        outputRange: [0.9, 1, 0.9],
                      }),
                    },
                    {
                      translateX: ani.interpolate({
                        inputRange: [
                          (index - 1) * width * 0.8,
                          index * width * 0.8,
                          (index + 1) * width * 0.8,
                        ],
                        outputRange: [-10, 0, 10],
                      }),
                    },
                  ],
                },
              ]}>
              <Image
                resizeMode="cover"
                source={item}
                style={{height: '100%', width: '100%', borderRadius: 20}}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
export default CustomCrousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});
