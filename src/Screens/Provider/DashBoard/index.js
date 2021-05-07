import React, {useState, useEffect} from 'react';
import {Container, Header, Body} from 'native-base';
import {
  FlatList,
  View,
  StyleSheet,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Card,
  Text,
  TouchableRipple,
  useTheme,
  Searchbar,
} from 'react-native-paper';

import Loading from '../../../Component/Loading';
import useUserCred from '../../../UserCredentials';
import {
  suppProvQueries,
  distProvQueries,
} from '../../../serverQueries/Provider';
import MyContainer from '../../../Component/MyContainer';

const ProviderDashboardScreen = ({navigation}) => {
  const [showProvresp, setShowProvResp] = useState(null);
  const [provResp, setProvResp] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();

  const {userCred, userDetails, deleteUserCred} = useUserCred();

  const selectedQueries =
    userCred.role === 'SP' ? suppProvQueries : distProvQueries;

  const loadScreen = async () => {
    const [payRespErr, payResp] = await selectedQueries.getOrders(
      userCred.relayToken,
      'payment',
    );
    console.log('loaded resp', payRespErr, payResp);
    if (payRespErr === null) {
      if (payResp.status == 200) {
        const [reqRespErr, reqResp] = await selectedQueries.getOrders(
          userCred.relayToken,
          'request',
        );
        if (reqRespErr === null) {
          if (reqResp.status == 200) {
            let tempArr = payResp.data;
            tempArr.push(...reqResp.data);
            setProvResp(tempArr);
            setShowProvResp(tempArr);
          } else if (reqResp.status == 403) {
            ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
            await deleteUserCred();
            setProvResp(null);
            setShowProvResp(null);
          } else {
            ToastAndroid.show(reqResp.data.error, ToastAndroid.LONG);
            setProvResp(null);
            setShowProvResp(null);
          }
        } else {
          ToastAndroid.show(reqRespErr.message, ToastAndroid.LONG);
          setProvResp(null);
          setShowProvResp(null);
        }
      } else if (payResp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
        setProvResp(null);
        setShowProvResp(null);
      } else {
        ToastAndroid.show(payResp.data.error, ToastAndroid.LONG);
        setProvResp(null);
        setShowProvResp(null);
      }
    } else {
      ToastAndroid.show(payRespErr.message, ToastAndroid.LONG);
      setProvResp(null);
      setShowProvResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Provider Dashboard screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const showSearchItem = () => {
    userCred.role === 'SP'
      ? setShowProvResp(
          provResp.filter((item) =>
            (
              item.request.requester_id.fName +
              ' ' +
              item.request.requester_id.lName
            )
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          ),
        )
      : setShowProvResp(
          provResp.filter((item) =>
            item.request.requester_id.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          ),
        );
  };

  const renderItem = ({item}) => {
    const ordersList = item.request.orders.map((ord) => ord.product.name);

    return (
      <Card
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: 'lightgrey',
        }}
        onPress={() => navigation.navigate('RequestDetail', {item: item})}>
        <Card.Content
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 5}}>
              {ordersList.join(', ')}
            </Text>
            <Text style={{fontSize: 17}}>
              {userCred.role === 'SP' ? 'Customer' : 'Supplier'} :{' '}
              {userCred.role === 'SP'
                ? item.request.requester_id.fName +
                  ' ' +
                  item.request.requester_id.lName
                : item.request.requester_id.name}
            </Text>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            {'₹ '} {item.request.payment_amount}
          </Text>
        </Card.Content>
        <Card.Content>
          <Text style={{fontSize: 17}}>
            {item.stageCompleted === 'request'
              ? `Request date : ${new Date(
                  item.request.time,
                ).toLocaleDateString()}`
              : `Payment date : ${new Date(
                  item.payment.time,
                ).toLocaleDateString()}`}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: item.stageCompleted === 'request' ? 'red' : 'orange',
            }}>
            {/* Status :{' '} */}
            {item.stageCompleted === 'request'
              ? 'Payment Not done'
              : 'Confirm Action needed'}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <MyContainer>
      <Appbar.Header>
        <Appbar.Action
          color="white"
          size={33}
          icon="menu"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content color="white" title="Home" />
        <Appbar.Action
          color="white"
          size={33}
          icon="magnify"
          onPress={() => setShowSearch(!showSearch)}
        />
      </Appbar.Header>
      {showSearch ? (
        <View
          style={{backgroundColor: theme.colors.primary, paddingBottom: 10}}>
          <Searchbar
            value={searchQuery}
            placeholder="Search"
            onChangeText={(query) => setSearchQuery(query)}
            onSubmitEditing={() => showSearchItem()}
            onIconPress={() => showSearchItem()}
            onTouchCancel={(e) => touchCancel(e)}
            style={{
              alignSelf: 'center',
              width: Dimensions.get('screen').width - 20,
              borderRadius: 5,
            }}
          />
        </View>
      ) : (
        <View />
      )}
      {showProvresp !== null ? (
        <>
          <FlatList
            data={showProvresp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={
              <>
                <Header
                  style={{
                    backgroundColor: theme.colors.accent,
                    height: 50,
                  }}>
                  <Body>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingLeft: 20,
                        color: '#fff',
                      }}>
                      Welcome, {userDetails.name}!
                    </Text>
                  </Body>
                </Header>
                <View style={{padding: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Orders for you
                  </Text>
                </View>
              </>
            }
            ListHeaderComponentStyle={{paddingBottom: 10}}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 17, fontStyle: 'italic'}}>
                  {showSearch ? 'Name not found!!' : 'No orders for you!!'}
                </Text>
              </View>
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </MyContainer>
  );
};

export default ProviderDashboardScreen;
