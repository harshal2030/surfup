import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Appbar, FAB, DefaultTheme, Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import FA from 'react-native-vector-icons/FontAwesome';

import {ItemCard} from '../components';

import {StoreState} from '../global';
import {getItems} from '../global/actions/items';
import {RootStackParamList} from '../navigators';

import {db, Item, Group, initTable} from '../db';

type navigation = StackNavigationProp<RootStackParamList>;

type Props = {
  items: Item[];
  navigation: navigation;
  getItems: typeof getItems;
  groups: Group[];
};

type State = {
  q: string;
  selected: string | null;
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      q: '',
      selected: null,
    };
  }

  componentDidMount() {
    db.transaction((tx) => {
      tx.executeSql('SELECT items.* FROM items', [], (_, {rows}) => {
        const {_array} = (rows as unknown) as {
          length: number;
          item(i: number): Item;
          _array: Item[];
        };

        console.log(_array);
        this.props.getItems(_array);
      });
    });

    initTable((id) => this.setState({selected: id}));
  }

  renderItem = ({item}: {item: Item}) => {
    return (
      <ItemCard
        stock={item.buy - item.sell}
        item={item.name}
        price={item.price}
        onEditPress={() => this.props.navigation.navigate('Items', {item})}
      />
    );
  };

  render() {
    const data = this.props.items.filter(
      (val) =>
        val.name.toLowerCase().includes(this.state.q.toLowerCase()) &&
        val.group_id === this.state.selected,
    );
    return (
      <View style={styles.root}>
        <Appbar.Header>
          <Searchbar
            value={this.state.q}
            placeholder="Search"
            onChangeText={(q) => this.setState({q})}
          />
        </Appbar.Header>

        <View style={styles.pickerContainer}>
          <Picker
            style={{width: '90%'}}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.selected}
            mode="dropdown"
            onValueChange={(val) => this.setState({selected: val})}>
            {this.props.groups.map((val) => (
              <Picker.Item label={val.name} value={val.id} key={val.id} />
            ))}
          </Picker>

          <FA
            name="pencil-square"
            size={24}
            onPress={() => this.props.navigation.navigate('Groups')}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={this.renderItem}
        />

        <FAB
          icon="plus"
          color="#fff"
          style={styles.fab}
          onPress={() => this.props.navigation.navigate('Items')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0,
    backgroundColor: DefaultTheme.colors.primary,
  },
  root: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  pickerItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: StoreState) => {
  return {
    items: state.items,
    groups: state.groups,
  };
};

export default connect(mapStateToProps, {getItems})(Home);
