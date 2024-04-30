import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

import Colors from '@/constants/Colors';
import SettingsItem from '@/components/settings/SettingsItem';

const SettingsScreen = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView>
        <SettingsItem />

        <TouchableOpacity onPress={() => signOut()}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              paddingVertical: 14,
              textAlign: 'center',
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
