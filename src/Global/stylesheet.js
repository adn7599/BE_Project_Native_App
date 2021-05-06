import {StyleSheet, Dimensions} from 'react-native';

const dimension = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    backgroundColor: '#e3fffe',
  },
  welcomeHeader: {
    backgroundColor: '#E4B884',
  },
  welcomeHeaderText: {
    fontSize: 20,
    paddingLeft: 20,
  },
  headerColor: {
    backgroundColor: 'white',
  },
  headerMenuBtn: {
    fontSize: 35,
    color: 'red',
  },
  headerText: {
    color: 'black',
    textAlign: 'center',
  },
  topBottomSep: {
    paddingTop: 20,
  },
  leftTopIndent: {
    padding: 20,
  },
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    flex: 0,
  },
  cardThumbnail: {
    height: 200,
    width: dimension.width - 80,
    flex: 1,
  },
  flexOne: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  cardRowEnd: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  btnText: {
    textAlign: 'center',
  },
  rightcornerBtn: {
    alignSelf: 'flex-end',
  },
});
