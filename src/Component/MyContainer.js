import {Container} from 'native-base';
import React from 'react';

const MyContainer = ({children}) => {
  return <Container style={{backgroundColor: '#FAF7F2'}}>{children}</Container>;
};

export default MyContainer;
