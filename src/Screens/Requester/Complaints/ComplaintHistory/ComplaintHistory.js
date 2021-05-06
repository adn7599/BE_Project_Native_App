import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {Appbar, Text, TouchableRipple, Card} from 'react-native-paper';
import useUserCred from '../../../../UserCredentials';
import {getComplaints} from '../../../../serverQueries/User/complaints';

import {} from 'react-native-paper';
import Loading from '../../../../Component/Loading';
import {Row} from 'native-base';

export default function ComplaintHistory({navigation}) {
  const [complaintsResp, setComplaintsResp] = useState(null);

  const {userCred, deleteUserCred} = useUserCred();

  const loadScreen = async () => {
    const [respErr, resp] = await getComplaints(userCred.ttpToken);
    console.log('loaded resp', respErr, resp);
    if (respErr === null) {
      if (resp.status == 200) {
        setComplaintsResp(resp.data);
      } else if (resp.status == 403) {
        ToastAndroid.show('Token expired\nLogin again', ToastAndroid.LONG);
        await deleteUserCred();
      } else {
        ToastAndroid.show(resp.data.error, ToastAndroid.LONG);
        setComplaintsResp(null);
      }
    } else {
      ToastAndroid.show(respErr.message, ToastAndroid.LONG);
      setComplaintsResp(null);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('your complaints screen focused');
      loadScreen();
    });
    return unsubscribe;
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableRipple
        onPress={() =>
          navigation.navigate('ComplaintHistoryDetails', {item: item})
        }>
        <Card
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            elevation: 12,
            borderRadius: 15,
          }}>
          <Card.Content>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {item.subject}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {userCred.role === 'customer' ? 'Supplier' : 'Distributor'} :{' '}
              </Text>
              <Text style={{fontSize: 17}}>{item.complainee.name}</Text>
            </View>
          </Card.Content>
          <Card.Content style={{paddingTop: 5}}>
            <Text style={{fontSize: 17}}>
              {new Date(item.time).toLocaleDateString()}
            </Text>
          </Card.Content>
        </Card>
      </TouchableRipple>
    );
  };

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Your Complaints" />
      </Appbar.Header>

      {complaintsResp !== null ? (
        <>
          <FlatList
            data={complaintsResp}
            initialNumToRender={7}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListHeaderComponent={<View></View>}
            ListHeaderComponentStyle={{paddingBottom: 20}}
          />
        </>
      ) : (
        <Loading />
      )}
    </SafeAreaView>
  );
}
