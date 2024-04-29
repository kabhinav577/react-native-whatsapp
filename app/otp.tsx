import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const INDIA_PHONE_MASKED = [
  '+',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

import Colors from '@/constants/Colors';
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';

const OtpScreen = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  const openLink = () => {
    Linking.openURL('https://whatsapp.com/legal/privacy_policy');
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      await signUp!.create({ phoneNumber });

      signUp!.preparePhoneNumberVerification();

      router.push(`/verify/${phoneNumber}`);
    } catch (error) {
      console.log('Error in Sending OTP', error);
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === 'form_identifier_exists') {
          // User signed up before
          console.log('User signed up before');
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert('Error', error.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text
              style={{
                padding: 10,
                fontFamily: 'helvnue-light',
                fontSize: 16,
              }}
            >
              Sending code...
            </Text>
          </View>
        )}
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>India</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />

          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+91 your phone number"
            style={styles.input}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={INDIA_PHONE_MASKED}
          />
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
    color: Colors.primary,
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
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 6,
    fontSize: 18,
    marginTop: 10,
    color: Colors.gray,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
