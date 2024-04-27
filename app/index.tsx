import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
//@ts-ignore
import welcomeImage from '@/assets/images/welcome.png';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

const WelcomeScreen = () => {
  const openLink = () => {
    Linking.openURL('https://whatsapp.com/legal/privacy_policy');
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome} />
      <Text style={styles.headline}>Welcome to WhatsApp</Text>
      <Text style={styles.description}>
        Read our{' '}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . Tap "Agree and Continue" to accept the{' '}
        <Text style={styles.link} onPress={openLink}>
          Terms of Service
        </Text>
        .
      </Text>
      <Link href={'/otp'} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Agree and Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    width: '100%',
    height: 350,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontFamily: 'helvnue-bold',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'helvnue-medium',
    textAlign: 'center',
    lineHeight: 15,
    color: Colors.gray,
    marginBottom: 80,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 22,
    fontFamily: 'helvnue-bold',
  },
});
