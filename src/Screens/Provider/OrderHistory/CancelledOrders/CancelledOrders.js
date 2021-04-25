import React, {useState, useEffect} from 'react';
import {
  Container,
  Card,
  Title,
  CardItem,
  Left,
  Right,
  Body,
  Content,
  Header,
  Icon,
  Text,
} from 'native-base';
import {FlatList, View, TouchableOpacity, ToastAndroid} from 'react-native';

import common from '../../../../Global/stylesheet';
import Loading from '../../../../Component/Loading';
import useUserCred from '../../../../UserCredentials';
import {
  suppProvQueries,
  distProvQueries,
} from '../../../../serverQueries/Provider';

const CancelledOrdersScreen = ({navigation}) => {
  const [cancelledResp, setCancelledResp] = useState(null);

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const loadScreen = async () => {
    const [respErr, resp] = await selectedQueries.getOrders(
      userCred.relayToken,
      'cancelled',
    );
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setCancelledResp(resp.data);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        setCancelledResp(null);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      setCancelledResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Confirmed order history screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    const ordersList = item.request.orders.map((ord) => ord.product.name);

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CancelledOrderDetails', {item: item})
        }>
        <Content style={common.cardContainer}>
          <Card style={common.card}>
            <CardItem>
              <Body>
                <Text>Transaction ID : {item._id}</Text>
                <Text>
                  {userCred.role === 'SP'
                    ? `Customer : ${item.request.requester_id.fName} ${item.request.requester_id.lName}`
                    : `Supplier : ${item.request.requester_id.name}`}
                </Text>
                <Text>Items: {ordersList.join(', ')}</Text>
                <Text>Status : Transaction Cancelled</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={common.container}>
      <Header style={common.headerColor}>
        <Left>
          <Icon
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            style={common.headerMenuBtn}
          />
        </Left>
        <Body>
          <Title style={common.headerText}>Cancelled Orders History</Title>
        </Body>
      </Header>
      <Header style={common.welcomeHeader}>
        <Body>
          <Text style={common.welcomeHeaderText}>
            Welcome {userDetails.name}
          </Text>
        </Body>
        <Right />
      </Header>
      <View style={common.topBottomSep}></View>
      {cancelledResp !== null ? (
        <>
          <FlatList
            data={cancelledResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default CancelledOrdersScreen;
