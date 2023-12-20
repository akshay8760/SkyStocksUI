import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Components/HomeScreen";
import AddStocks from "./Components/AddStocks";
import Adminpanel from "./Components/AdminPanel";
import Settings from "./Components/Settings";
import InfoScreen from "./Components/InfoScreen";
import EditScreen from "./Components/EditScreen";
import { DataProvider } from "./Context/DataContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/home.png");
const homeIcon_active = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/home-active.png");
const addStockIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/trend.png");
const addStockIcon_active = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/trend-active.png");
const adminpanelIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/admin.png");
const adminPanelIcon_active = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/admin-active.png");
const settingsicon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/settings.png");
const SettingsIcon_active = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/settings-active.png");

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Initial" component={HomeScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? homeIcon_active : homeIcon;
              } else if (route.name === "Add Stocks") {
                iconName = focused ? addStockIcon_active : addStockIcon;
              } else if (route.name === "Admin") {
                iconName = focused ? adminPanelIcon_active : adminpanelIcon;
              } else if (route.name === "Settings") {
                iconName = focused ? SettingsIcon_active : settingsicon;
              }

              return (
                <Image
                  source={iconName}
                  resizeMode="contain"
                  style={styles.footericon}
                />
              );
            },
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 10,
              marginTop: 4,
            },
            tabBarStyle: {
              position: "absolute",
              paddingTop: 6,
              paddingBottom: 6,
              backgroundColor: "white",
              height: 60,
              bottom: 0,
            },
            safeAreaInsets: {
              bottom: 60,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Add Stocks" component={AddStocks} />
          <Tab.Screen name="Admin" component={Adminpanel} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footericon: {
    width: 25,
  },
});
