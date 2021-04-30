import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

import styles from './styles';
import {COLORS} from '../../../assets/COLORS';

// Custom Done button at the end of onboarding screens
const Done = ({...props}) => {
  return (
    <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
      <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
  );
};

const OnboardingScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Onboarding
        DoneButtonComponent={Done}
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.replace('Login')}
        pages={[
          {
            backgroundColor: COLORS.primary,
            image: (
              <Image
                source={require('../../../assets/images/onboarding-img1.png')}
              />
            ),
            title: 'Register',
            subtitle: 'Create your account on our app',
          },
          {
            backgroundColor: COLORS.secondary,
            image: (
              <Image
                source={require('../../../assets/images/onboarding-img2.png')}
              />
            ),
            title: 'Search',
            subtitle: 'Search for the commodity you want',
          },
          {
            backgroundColor: COLORS.backgroundMedium,
            image: (
              <Image
                source={require('../../../assets/images/onboarding-img3.png')}
              />
            ),
            title: 'Order',
            subtitle: 'Order the commodity from the shop of your choice',
          },
        ]}
      />
    </ScrollView>
  );
};

export default OnboardingScreen;
