import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';

import Colors from '@/constants/Colors';

const CallsScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic"></ScrollView>
    </View>
  );
};

export default CallsScreen;
