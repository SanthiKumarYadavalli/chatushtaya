import { View, Platform, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import TabBarButton from "./TabBarButton";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function TabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const buttonWidth = dimensions.width / state.routes.length;
  // console.log(buttonWidth);

  const onTabBarLayout = (e) => {
    const { layout } = e.nativeEvent; // Extract layout data before React nullifies it
    if (!layout) {
      return;
    }
    setDimensions((prev) => ({
      ...prev,
      height: layout.height,
      width: layout.width,
    }));
  };

  const tabX = useSharedValue(0);

  useEffect(() => {
    tabX.value = withSpring(buttonWidth * (state.index - 1), {
      duration: 1500,
    });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabX.value }],
    };
  });

  return (
    <View style={styles.tabBar} onLayout={(e) => onTabBarLayout(e)}>
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: "#f72c5b",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 18,
          },
          animatedStyle,
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#f72c5b" : colors.text}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 70,
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 2,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
