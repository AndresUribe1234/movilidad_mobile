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
import * as TaskManager from "expo-task-manager";
import { supabase } from "./utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const TASK_NAME = "BACKGROUND_LOCATION_TASK";

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];

    if (location) {
      console.log("location from task:", location);
      const storedObject = await AsyncStorage.getItem("phoneNumber");
      if (storedObject !== null) {
        const parsedObject = JSON.parse(storedObject);
        console.log("");
        console.log("before insert");
        const response = await supabase.from("ubicaciones").insert({
          idUsuario: Number(parsedObject),
          longitude: location?.coords?.longitude,
          latitude: location?.coords?.latitude,
        });
      }
    }
  }
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
  const [loading, setLoading] = useState(true);
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();
  const [locationPermissionBackgroundInformation, requestPermissionBackground] =
    Location.useBackgroundPermissions();

  console.log("authctx:", authctx);

  useEffect(() => {
    if (authctx.credentials) {
      if (
        authctx.credentials.logged &&
        authctx.credentials.phoneNumber.length === 9
      ) {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [authctx.credentials]);

  useEffect(() => {
    verifyPermissions();
    verifyPermissionsBackground();
  }, []);

  useEffect(() => {
    verifyPermissions();
    verifyPermissionsBackground();
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

  async function verifyPermissionsBackground() {
    try {
      if (locationPermissionBackgroundInformation.status !== "granted") {
        const { status, canAskAgain } = await requestPermissionBackground();
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (
    locationPermissionBackgroundInformation &&
    locationPermissionBackgroundInformation.status === "granted"
  ) {
    (async function () {
      try {
        console.log("Hi mom!");
        await Location.startLocationUpdatesAsync(TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 0, // Do not update based on the distance
          showsBackgroundLocationIndicator: true,
        });
        // Make sure the task is defined otherwise do not start tracking
        const isTaskDefined = await TaskManager.isTaskDefined(TASK_NAME);
        if (!isTaskDefined) {
          console.log("Task is not defined");
          return;
        }
        // Don't track if it is already running in background
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
          TASK_NAME
        );
        if (hasStarted) {
          console.log("Already started");
          return;
        }
        console.log("before end of code block");
      } catch (err) {
        console.log("from task that launches location:", err);
      }
    })();
  }

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
