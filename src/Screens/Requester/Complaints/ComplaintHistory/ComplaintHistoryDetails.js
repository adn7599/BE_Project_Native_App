import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Appbar, Text, DataTable, TextInput, Button} from 'react-native-paper';
import useUserCred from '../../../../UserCredentials';
import moment from 'moment';

import {Container} from 'native-base';
import MyContainer from '../../../../Component/MyContainer';

const ComplaintHistoryDetailsScreen = ({navigation, route}) => {
  const {userCred} = useUserCred();
  const {item} = route.params;

  return (
    <MyContainer>
      <Appbar.Header>
        <Appbar.BackAction color="white" onPress={() => navigation.pop()} />
        <Appbar.Content color="white" title="Complaint Details" />
      </Appbar.Header>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style = {{marginTop : 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 23}}>{item.subject}</Text>
          <Text style={{fontSize: 17}}>
            {moment(new Date(item.time)).format('lll')}
          </Text>
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              fontStyle: 'italic',
              paddingBottom: 10,
            }}>
            {userCred.role === 'customer' ? 'Supplier' : 'Distributor'} Details
          </Text>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>ID</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.complainee._id}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Name</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.complainee.name}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Mob No.</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.complainee.mobNo}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell style={{flex: 1}}>Email</DataTable.Cell>
              <DataTable.Cell style={{flex: 3}}>
                {item.complainee.email}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <View style={{marginBottom : 20}}>
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              fontWeight: 'bold',
              paddingBottom: 10,
            }}>
            Complaint
          </Text>
          <TextInput
            value={item.body}
            editable={false}
            mode="outlined"
            multiline={true}
            numberOfLines={18}
          />
        </View>
        <View style={{alignSelf: 'center', paddingBottom: 20}}>
          <Button uppercase = {false} mode="contained" onPress={() => navigation.pop()}>
            Okay
          </Button>
        </View>
      </ScrollView>
    </MyContainer>
  );
};

export default ComplaintHistoryDetailsScreen;
