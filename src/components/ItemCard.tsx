import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {greyWithAlpha} from '../utils/colors';
import FA5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  item: string;
  stock: number;
  onEditPress(): void;
  price?: number | null;
};

const ItemCard = (props: Props) => {
  return (
    <View style={styles.parent}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <FA5 name="box" color="#000" style={styles.icon} size={22} />
          <Text style={styles.itemText}>{props.item}</Text>
        </View>

        <Button onPress={props.onEditPress}>Edit</Button>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>In Stock: {props.stock}</Text>
        {props.price && (
          <Text style={styles.contentText}>Cost Price: {props.price}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderWidth: 1,
    borderColor: greyWithAlpha(0.4),
    padding: 10,
    borderRadius: 2,
    margin: 5,
    backgroundColor: '#ffff',
  },
  itemText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
    width: '69%',
  },
  icon: {
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: greyWithAlpha(0.4),
    paddingBottom: 8,
    flexWrap: 'wrap',
  },
  content: {
    marginTop: 8,
    paddingLeft: 5,
  },
  contentText: {
    fontSize: 17,
    color: '#000',
  },
});

export {ItemCard};
