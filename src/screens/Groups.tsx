import React from 'react';
import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {Appbar, IconButton, Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {nanoid} from 'nanoid';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';

import {StoreState} from '../global';
import {insertGroup, updateGroup, deleteGroup} from '../global/actions/group';
import {deleteItemByGroup} from '../global/actions/items';

import {commonGrey, flatRed} from '../utils/colors';
import {RootStackParamList} from '../navigators';
import {
  Group,
  deleteGroupFromTables,
  addGroupInTable,
  updateGroupInTable,
} from '../db';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Groups'>;
  groups: Group[];
  insertGroup: typeof insertGroup;
  updateGroup: typeof updateGroup;
  deleteGroup: typeof deleteGroup;
  deleteItemByGroup: typeof deleteItemByGroup;
};

type State = {
  dialog: boolean;
  updateDialog: boolean;
  text: string;
  id: string;
};

class Groups extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      dialog: false,
      updateDialog: false,
      text: '',
      id: '',
    };
  }

  deleteGroup = (id: string) => {
    if (id === 'default') {
      Alert.alert('', 'You cannot delete the default group');
      return;
    }

    Alert.alert(
      'Confirm',
      'Are you sure to delete the group? This will delete all related data.',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.props.deleteGroup(id);
            deleteGroupFromTables(id);
            this.props.deleteItemByGroup(id);
          },
        },
      ],
    );
  };

  createGroup = () => {
    const id = nanoid(10);
    const name = this.state.text;

    this.props.insertGroup({id, name});
    addGroupInTable(id, name);

    this.setState({text: '', dialog: false});
  };

  updateGroup = () => {
    const id = this.state.id;
    const name = this.state.text;

    this.props.updateGroup({id, name});
    updateGroupInTable(id, name);

    this.setState({text: '', updateDialog: false});
  };

  renderFooter = () => {
    return (
      <Button
        mode="text"
        icon="plus"
        onPress={() => this.setState({dialog: true})}>
        Add Group
      </Button>
    );
  };

  renderItem = ({item}: {item: Group}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>

        <View style={{flexDirection: 'row'}}>
          <IconButton
            icon="pencil"
            onPress={() =>
              this.setState({updateDialog: true, text: item.name, id: item.id})
            }
          />
          <IconButton
            icon="delete-outline"
            color={flatRed}
            onPress={() => this.deleteGroup(item.id)}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Groups" />
        </Appbar.Header>

        <Dialog.Container visible={this.state.dialog}>
          <Dialog.Title>Enter Group Name</Dialog.Title>
          <Dialog.Input
            placeholder="Group Name"
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({dialog: false})}
          />
          <Dialog.Button label="Create" onPress={this.createGroup} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.updateDialog}>
          <Dialog.Title>Update Group Name</Dialog.Title>
          <Dialog.Input
            placeholder="Group Name"
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => this.setState({updateDialog: false})}
          />
          <Dialog.Button label="Update" onPress={this.updateGroup} />
        </Dialog.Container>

        <FlatList
          data={this.props.groups}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    borderBottomColor: commonGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
});

const mapStateToProps = (state: StoreState) => {
  return {
    groups: state.groups,
  };
};

export default connect(mapStateToProps, {
  insertGroup,
  updateGroup,
  deleteGroup,
  deleteItemByGroup,
})(Groups);
