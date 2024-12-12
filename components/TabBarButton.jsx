import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
// import { useSharedValue, withSpring } from "react-native-reanimated";
// import { useEffect } from "react";

const icons = {
  home: (props) => <Feather name="home" size={20} color={props.color} />,
  explore: (props) => <Feather name="compass" size={20} color={props.color} />,
  profile: (props) => <Feather name="user" size={20} color={props.color} />,
};

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) {
  const { colors } = useTheme();
  //   const scale = useSharedValue(0);

  //   useEffect(() => {
  //     scale.value = withSpring(
  //       typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
  //       { duration: 350 }
  //     );
  //   }, [scale, isFocused]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 justify-center items-center"
    >
      {icons[routeName]({ color: isFocused ? "red" : colors.text })}
      <Text style={{ color }} className="font-pextralight">
        {label}
      </Text>
    </Pressable>
  );
}
