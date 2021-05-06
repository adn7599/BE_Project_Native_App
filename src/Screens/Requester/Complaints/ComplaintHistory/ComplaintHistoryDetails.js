import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import {Appbar, Text, DataTable, TextInput} from 'react-native-paper';
import useUserCred from '../../../../UserCredentials';
import moment from 'moment';

import {} from 'react-native-paper';
import {Container} from 'native-base';

export default function ComplaintHistoryDetails({navigation, route}) {
  const {userCred} = useUserCred();
  const {item} = route.params;

  return (
    <Container>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Complaint Details" />
      </Appbar.Header>
      <ScrollView style={{padding: 20}}>
        <Text style={{fontWeight: 'bold', fontSize: 23}}>{item.subject}</Text>
        <Text style={{fontSize: 17}}>
          {moment(new Date(item.time)).format('lll')}
        </Text>
        <View style={{paddingVertical: 20}}>
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
        <Text
          style={{
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
            paddingBottom: 10,
          }}>
          Complaint
        </Text>
        <View style={{paddingBottom: 20}}>
          <TextInput
            value={item.body}
            editable={false}
            mode="outlined"
            multiline={true}
            numberOfLines={18}
          />
        </View>
      </ScrollView>
    </Container>
  );
}
