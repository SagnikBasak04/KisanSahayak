import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableHighlight, Dimensions} from 'react-native';
var thisObj;
var deviceHeight = Dimensions.get("window").height;

class MyListItem extends React.PureComponent {

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableHighlight onPress={this.props.onPress.bind(this)} underlayColor='#616161'>
                    <Text style={this.props.style}>{this.props.item.key}</Text>
                </TouchableHighlight>
            </View>
            );
    }
}

export default class MultiSelect extends React.Component {
    constructor(props) {
      super(props);
      var selectedItemsObj = {};
      if(this.props.selectedItems) {
          var items = this.props.selectedItems.split(',');
          items.forEach(function(item) {
            selectedItemsObj[item] = true;
          });   
      }
      this.state = {
        selectedItems: selectedItemsObj
      };
    }

    onItemPressed(item) {
        var oldSelectedItems = this.state.selectedItems;
        var itemState = oldSelectedItems[item.key];
        if(!itemState) {
            oldSelectedItems[item.key] = true;
        }
        else {
            var newState = itemState? false: true;
            oldSelectedItems[item.key] = newState;
        }
        this.setState({
            selectedItems: oldSelectedItems,
        });
        var arrayOfSelectedItems = [];
        var joinedItems = Object.keys(oldSelectedItems);
        joinedItems.forEach(function(key) {
            if(oldSelectedItems[key])
                arrayOfSelectedItems.push(key);
        });
        var selectedItem = null;
        if(arrayOfSelectedItems.length > 0)
            selectedItem = arrayOfSelectedItems.join();
        this.props.onValueChange(selectedItem);
    }

    getStyle(item) {
        try {
            console.log(thisObj.state.selectedItems[item.key]);
            return thisObj.state.selectedItems[item.key]? styles.itemTextSelected : styles.itemText;
        } catch(e) {
            return styles.itemText;
        }
    }

    _renderItem = ({item}) => {
        return (<MyListItem style={this.getStyle(item)} onPress={this.onItemPressed.bind(this, item)} item={item} />);
    }
    render() {
        return (
            <View style={styles.rootView}>
                <FlatList style={styles.list}
                    initialNumToRender={10}
                    extraData={this.state}
                    data={this.props.data}
                    renderItem={this._renderItem.bind(this)}
                    />
            </View>
            );
    }
}

const styles = StyleSheet.create({
    rootView : {
        height: deviceHeight / 2
    },
    itemText: {
        padding: 8,
        color: "#fff"
    },
    itemTextSelected: {
        padding: 8,
        color: "#fff",
        backgroundColor: '#757575'
    },
    list: {
        flex: 1,
    }
});