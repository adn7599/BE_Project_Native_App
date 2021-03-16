import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';

const Home = () => {
  return (
    <>
      <SafeAreaView>
        {/* HEADER */}
        <View>
          {/* TOP AREA */}
          <View>
            {/* MENU BUTTON */}
            {/* APP NAME/LOGO */}
            <Text>APP NAME</Text>
            {/* CART */}
            <Text>CART</Text>
          </View>
          {/* MIDDLE AREA */}
          <View>{/* SEARCHBOX */}</View>
          {/* BOTTOM AREA */}
          <View>{/* SET LOCATION */}</View>
        </View>

        {/* CONTENT FLATLIST */}
        <View>{/* ITEMS */}</View>
      </SafeAreaView>
    </>
  );
};

export default Home;
