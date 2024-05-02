import { View, Text, ScrollView, FlatList } from 'react-native';

import chats from '@/assets/data/chats.json';
import ChatItem from '@/components/chats/ChatItem';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40, backgroundColor: 'white' }}
    >
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        scrollEnabled={false}
        renderItem={({ item }) => <ChatItem {...item} />}
      />
    </ScrollView>
  );
};

export default Page;
