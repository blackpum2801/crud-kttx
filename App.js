import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import Task from './components/Task';
import styles from './App.components.style';
import Form from './components/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // Load saved tasks when component mounts
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('taskList');
      if (savedTasks !== null) {
        setTaskList(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('taskList', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = (task) => {
    // add Task
    const updatedTasks = [...taskList, task];
    setTaskList(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    Alert.alert('Thông báo', 'Bạn có chắc chắn muốn xóa', [
      {
        text: 'Ok',
        onPress: () => {
          const updatedTasks = [...taskList];
          updatedTasks.splice(index, 1);
          setTaskList(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
      { text: 'cancel', onPress: () => { } },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List</Text>
        {taskList.length === 0 ? (
          <Text style={[styles.emptyText, styles.centerText]}>Vui lòng nhập công việc mới</Text>
        ) : (
          <ScrollView style={styles.items}>
            {taskList.map((item, index) => (
              <Task
                key={index}
                title={item}
                number={index + 1}
                onDeleteTask={() => handleDeleteTask(index)}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <Form onAddTask={handleAddTask} />
    </View>
  );
}
