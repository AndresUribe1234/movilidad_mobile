import { StatusBar } from "expo-status-bar";
import SignUpScreen from "./screens/SignUpScreen";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./screens/InitialScreen";
import IncidentForm from "./screens/IncidentForm";
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
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  useEffect(() => {
    if (authctx?.credentials?.length === 9) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authctx.credentials]);

  useEffect(() => {
    verifyPermissions();
  }, []);

  useEffect(() => {
    verifyPermissions();
  }, [locationPermissionInformation]);

  async function verifyPermissions() {
    try {
      if (locationPermissionInformation.status !== "granted") {
        const { status, canAskAgain } = await requestPermission();
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(locationPermissionInformation);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={InitialScreen} />
          <Stack.Screen name="Form" component={IncidentForm} />
        </Stack.Navigator>
      ) : (
        <SignUpScreen />
      )}
    </NavigationContainer>
  );
}
