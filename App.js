import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import InitialScreen from "./screens/InitialScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { useContext, useEffect, useState } from "react";

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
