import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import AppleStyleSwipeableRow from '../AppleStyleSwipeableRow';

export interface ChatItemProps {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}

const ChatItem: React.FC<ChatItemProps> = ({
  id,
  img,
  from,
  date,
  msg,
  read,
  unreadCount,
}) => {
  return (
    <AppleStyleSwipeableRow>
      <Link href={`/(tabs)/chats`} asChild>
        <TouchableHighlight
          underlayColor={Colors.lightGray}
          activeOpacity={0.5}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
              paddingLeft: 20,
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: img }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{from}</Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>
                {msg.length > 40 ? msg.slice(0, 40) + '...' : msg}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.gray,
                paddingRight: 20,
                alignSelf: 'flex-start',
              }}
            >
              {format(date, 'dd/MM/yyyy')}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleStyleSwipeableRow>
  );
};

export default ChatItem;
