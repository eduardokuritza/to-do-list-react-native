import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface TaskProps extends TouchableOpacityProps {
  value?: string;
  done?: boolean;
  onDelete?: () => void;
}

const Task: FC<TaskProps> = ({ value, done, onDelete, ...props }) => {
  return (
    <TouchableOpacity style={[styles.container, done && styles.doneContainer]} {...props}>
      <Text style={[styles.text, done && styles.doneText]}>{value}</Text>
      {!done && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <AntDesign name="delete" size={22} color="#fff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
    borderRadius: 4,
  },
  doneContainer: {
    opacity: 0.5,
  },
  text: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#fff",
  },
  doneText: {
    textDecorationLine: "line-through",
  },
  deleteButton: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(244, 67, 54, 0.8)",
    borderRadius: 4,
  },
});
