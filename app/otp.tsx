import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OtpScreen = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  const openLink = () => {
    Linking.openURL('https://whatsapp.com/legal/privacy_policy');
  };

  const sendOtp = async () => {};

  const trySignIn = async () => {};

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>India</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
        </View>

        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp work with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies.
          </Text>
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          onPress={sendOtp}
          style={[
            styles.button,
            phoneNumber !== '' ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          disabled={phoneNumber === ''}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== '' ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  description: {
    fontSize: 14,
    fontFamily: 'helvnue-medium',
    color: Colors.gray,
  },
  list: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    fontFamily: 'helvnue-medium',
    color: Colors.gray,
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  legal: {
    fontSize: 12,
    fontFamily: 'helvnue-medium',
    textAlign: 'center',
    color: '#000',
    lineHeight: 15,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    fontSize: 22,
    fontFamily: 'helvnue-bold',
    color: Colors.gray,
  },
});
