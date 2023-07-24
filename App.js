import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import InitialScreen from "./screens/InitialScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="auto" />
      <Root />
    </AuthContextProvider>
  );
}

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authctx = useContext(AuthContext);

  useEffect(() => {
    // Check if the app already has permission on mount
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      console.log("Foreground location permission already granted!");
    } else {
      console.log("Foreground location permission not granted.");
      requestForegroundLocationPermission();
    }

    const { backgroundStatus } = await Location.getBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      console.log("Background location permission already granted!");
    } else {
      console.log("Background location permission not granted.");
      requestBackgroundLocationPermission();
    }
  };

  const requestForegroundLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync({
      android: {
        detail:
          "Esta aplicación necesita acceder a tu ubicación para brindarte una experiencia personalizada y mejorar nuestros servicios. Por favor, permite el acceso a la ubicación.",
        canAskAgain: true, // Set this to false if you don't want to ask again after denial
      },
    });
    if (status === "granted") {
      console.log("Foreground location permission granted!");
    } else {
      console.log("Foreground location permission denied.");
    }
  };

  const requestBackgroundLocationPermission = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync({
      android: {
        detail:
          "Esta aplicación necesita acceder a tu ubicación para brindarte una experiencia personalizada y mejorar nuestros servicios. Por favor, permite el acceso a la ubicación.",
        canAskAgain: true, // Set this to false if you don't want to ask again after denial
      },
    });
    if (status === "granted") {
      console.log("Background location permission granted!");
    } else {
      console.log("Background location permission denied.");
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={InitialScreen} />
        </Stack.Navigator>
      ) : (
        <SignUpScreen />
      )}
    </NavigationContainer>
  );
}
