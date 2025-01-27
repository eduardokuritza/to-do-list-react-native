import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Task from "@/components/Task/Task";

interface TaskItem {
  value: string;
  done: boolean;
  createdAt: Date;
  id: string;
}

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Add a new task to the list
  const addTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    setTasks((prev) => [
      ...prev,
      {
        value: trimmedTask,
        done: false,
        createdAt: new Date(),
        id: Math.random().toString(),
      },
    ]);
    setTask("");
  };

  // Delete a task by ID
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  // Toggle a task’s done state by ID
  const toggleTaskDone = (id: string) => {
    setTasks((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  // Clear all tasks that are marked as done
  const clearDoneTasks = () => {
    Alert.alert("Clear Done Tasks", "Are you sure you want to clear all done tasks?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => setTasks((prev) => prev.filter((item) => !item.done)),
      },
    ]);
  };

  // Sorting tasks by creation date
  const undoneTasks = tasks.filter((item) => !item.done).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const doneTasks = tasks.filter((item) => item.done);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>To Do List</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Type your task..." value={task} onChangeText={setTask} />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <AntDesign name="plus" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.subtitle}>To Do</Text>
        <View style={styles.list}>
          {undoneTasks.map((item) => (
            <Task key={item.id} value={item.value} done={item.done} onPress={() => toggleTaskDone(item.id)} onDelete={() => deleteTask(item.id)} />
          ))}
        </View>

        <Text style={styles.subtitle}>Done</Text>
        <View style={styles.list}>
          {doneTasks.map((item) => (
            <Task key={item.id} value={item.value} done={item.done} onPress={() => toggleTaskDone(item.id)} />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      {doneTasks.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity onPress={clearDoneTasks} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Done</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
  },
  header: {
    padding: 16,
    gap: 16,
    backgroundColor: "#121212",
  },
  title: {
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 8,
    height: 48,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#000",
    fontWeight: "500",
    backgroundColor: "#e0e0e0",
    borderColor: "#535353",
    borderRadius: 8,
    borderWidth: 1,
  },
  addButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1DB954",
    borderRadius: 8,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: "#212121",
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#535353",
  },
  list: {
    gap: 8,
  },
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  clearButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "rgba(244, 67, 54, 0.7)",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "white",
    textAlign: "center",
    padding: 8,
  },
});
