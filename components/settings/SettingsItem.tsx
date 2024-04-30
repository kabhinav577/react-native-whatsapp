import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import { devices, items, support } from '@/constants/Settings';
import BoxedIcon from '../BoxedIcon';
import { Ionicons } from '@expo/vector-icons';

type ItemProps = {
  item: { name: string; icon: string; backgroundColor: string };
};

const Item = ({ item }: ItemProps) => {
  return (
    <View style={defaultStyles.item}>
      <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
      <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} />
    </View>
  );
};

const SettingsItem = () => {
  return (
    <>
      {/* DEVICES LINKS */}
      <View style={defaultStyles.block}>
        <FlatList
          data={devices}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={defaultStyles.separator} />
          )}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>

      {/* ITEMS LINKS */}
      <View style={defaultStyles.block}>
        <FlatList
          data={items}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={defaultStyles.separator} />
          )}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>

      {/* SUPPORT LINKS */}
      <View style={defaultStyles.block}>
        <FlatList
          data={support}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={defaultStyles.separator} />
          )}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>
    </>
  );
};

export default SettingsItem;
