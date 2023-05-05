import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokemonHome from "./../screens/PokemonHome";
import PokemonDetails from "../screens/PokemonDetails";
import { TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieScreen from "../screens/LottieScreen";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lottie"
        component={LottieScreen}
        options={() => ({
          headerTransparent: true,
          title: "",
          headerTintColor: "#fefefe",
          headerShadowVisible: false,
          headerBackVisible: false,
        })}
      />

      <Stack.Screen
        name="PokemonHome"
        component={PokemonHome}
        options={({ navigation }) => ({
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 30, marginTop: 20 }}>Pokédex</Text>
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          // headerTintColor: "#fefefe",
          headerShadowVisible: false,
          // headerBackVisible: true,
          headerBackVisible: false,
          contentStyle: {
            // borderTopColor: "black",
            // borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: "#d6eadf",
          },
        })}
      />

      <Stack.Screen
        name="PokemonDetails"
        component={PokemonDetails}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              // style={{
              //   marginVertical: 40,
              // }}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="close-circle-outline"
                size={32}
                color="black"
              />
            </TouchableOpacity>
          ),
          headerTransparent: true,
          title: "",
          headerTintColor: "#fefefe",
          headerShadowVisible: false,
          headerBackVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
