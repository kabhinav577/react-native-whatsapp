import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { format } from 'date-fns';
import SwipeableRow from '../SwipeableRow';
import { defaultStyles } from '@/constants/Styles';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type Props = {
  removeCall: (id: string) => void;
  items: any;
  animatedRowStyles: any;
};

const transition = CurvedTransition.delay(100);

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CallsItem = ({ items, removeCall, animatedRowStyles }: Props) => {
  return (
    <Animated.View style={defaultStyles.block} layout={transition}>
      <Animated.FlatList
        skipEnteringExitingAnimations
        data={items}
        scrollEnabled={false}
        itemLayoutAnimation={transition}
        ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SwipeableRow onDelete={() => removeCall(item.id)}>
            <Animated.View
              entering={FadeInUp.delay(index * 10)}
              exiting={FadeOutUp}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <AnimatedTouchableOpacity
                onPress={() => removeCall(item.id)}
                style={[animatedRowStyles, { paddingLeft: 8 }]}
              >
                <Ionicons name="remove-circle" size={24} color={Colors.red} />
              </AnimatedTouchableOpacity>

              <Animated.View
                style={[
                  defaultStyles.item,
                  animatedRowStyles,
                  { paddingLeft: 10 },
                ]}
              >
                <Image source={{ uri: item.img }} style={styles.avatar} />

                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: item.missed ? Colors.red : '#000',
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: Colors.gray }}>
                    {format(item.date, 'dd.MM.yy')}
                  </Text>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={Colors.primary}
                  />
                </View>
              </Animated.View>
            </Animated.View>
          </SwipeableRow>
        )}
      />
    </Animated.View>
  );
};

export default CallsItem;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
