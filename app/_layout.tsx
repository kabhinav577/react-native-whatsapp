import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      throw new Error('Failed to save token');
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const [loaded, error] = useFonts({
    'helvnue-light': require('@/assets/fonts/HelveticaNeueLight.otf'),
    'helvnue-medium': require('@/assets/fonts/HelveticaNeueMedium.otf'),
    'helvnue-bold': require('@/assets/fonts/HelveticaNeueBold.otf'),
    'helvnue-heavy': require('@/assets/fonts/HelveticaNeueHeavy.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="otp"
        options={{
          headerTitle: 'Enter your Phone Number',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: 'Verify Phone Number',
          headerBackTitle: 'Edit number',
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/new-chat"
        options={{
          presentation: 'modal',
          title: 'New Chat',
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search name or number',
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <Link href="/(tabs)/chats" asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.lightGray,
                  borderRadius: 20,
                  padding: 4,
                }}
              >
                <Ionicons name="close" color={Colors.gray} size={30} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayout;
