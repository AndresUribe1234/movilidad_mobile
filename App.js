import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import InitialScreen from "./screens/InitialScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import IncidentForm from "./screens/IncidentForm";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { supabase } from "./utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const TASK_NAME = "SEND_LOCATION";

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    let currentLocation = await Location.getCurrentPositionAsync({});
    console.log("My task ", currentLocation);
    const storedObject = await AsyncStorage.getItem("phoneNumber");
    const parsedObject = JSON.parse(storedObject);
    console.log("Parsed object:", parsedObject);

    const response = await supabase.from("ubicaciones").insert({
      idUsuario: parsedObject,
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude,
      tipo: "Background",
    });

    return BackgroundFetch.Result.NewData;
  } catch (err) {
    console.log("Logging fail msg from definition of task...", err);
    return BackgroundFetch.Result.NoData;
  }
});
const SERVI_HPTA = "APRETAR CULO";

TaskManager.defineTask(SERVI_HPTA, async ({ data: { locations }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  console.log("Received new locations", locations);
  console.log("----");
  const storedObject = await AsyncStorage.getItem("phoneNumber");
  const parsedObject = JSON.parse(storedObject);
  console.log("Parsed object:", parsedObject);
  console.log("latitud:", locations[0].coords.latitude);
  console.log("longitude:", locations[0].coords.longitude);

  const response = await supabase.from("ubicaciones").insert({
    idUsuario: parsedObject,
    longitude: locations[0].coords.longitude,
    latitude: locations[0].coords.latitude,
    tipo: "Location Task",
  });
});

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

  const RegisterBackgroundTask = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 1 * 60, // seconds,
      });
      console.log("Task registered");
    } catch (err) {
      console.log("Logging fail msg from registration...");
      console.log("Task Register failed:", err);
    }
  };

  const registerLocationUpdates = async () => {
    await Location.startLocationUpdatesAsync(SERVI_HPTA, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 10000, // Update every 10 seconds
      distanceInterval: 0, // Do not update based on the distance
      showsBackgroundLocationIndicator: true,
    });
  };

  useEffect(() => {
    checkLocationPermission();
    RegisterBackgroundTask();
    registerLocationUpdates();

    (async function () {
      let currentLocation = await Location.getCurrentPositionAsync({});

      if (authctx.credentials) {
        const response = await supabase.from("ubicaciones").insert({
          idUsuario: authctx.credentials,
          longitude: currentLocation.coords.longitude,
          latitude: currentLocation.coords.latitude,
        });
      }
    })();

    const interval = setInterval(() => {
      (async function () {
        let currentLocation = await Location.getCurrentPositionAsync({});

        if (authctx.credentials) {
          console.log("Insert from foreground...");
          const response = await supabase.from("ubicaciones").insert({
            idUsuario: authctx.credentials,
            longitude: currentLocation.coords.longitude,
            latitude: currentLocation.coords.latitude,
            tipo: "Foreground",
          });
          console.log(response);
        }
      })();
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (authctx.credentials) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authctx.credentials]);

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
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      console.log("Foreground location permission granted!");
    } else {
      console.log("Foreground location permission denied.");
    }
  };

  const requestBackgroundLocationPermission = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
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
          <Stack.Screen name="Form" component={IncidentForm} />
        </Stack.Navigator>
      ) : (
        <SignUpScreen />
      )}
    </NavigationContainer>
  );
}
