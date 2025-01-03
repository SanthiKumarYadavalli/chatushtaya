import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
// import { useEffect } from "react";

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) {
  const { colors } = useTheme();
  const scale = useSharedValue(0);

  const icons = {
    contact: (props) => (
      <AntDesign name="contacts" size={24} color={props.color} />
    ),
    ai: (props) => (
      <MaterialCommunityIcons
        name="robot-excited-outline"
        size={24}
        color={props.color}
      />
    ),
    profile: (props) => <Feather name="question-mark" size={24} color={props.color} />,
    reports: (props) => <AntDesign name="form" size={24} color={props.color} />,
    default: (props) => <Feather name="question-mark" size={24} color={props.color} />
  };

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  const currentIcon = icons[routeName]?icons[routeName]:icons['default'];
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 justify-center items-center"
    >
      <Animated.Text style={animatedIconStyle}>
        {currentIcon({ color: isFocused ? "#fff" : colors.text })}
      </Animated.Text>
      <Animated.Text
        style={[
          { color: isFocused ? "#fff" : colors.text, fontSize: 12 },
          animatedTextStyle,
        ]}
        className="font-pextralight"
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}
