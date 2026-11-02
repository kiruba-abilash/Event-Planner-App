import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function EventForm({
  onSave,
  onCancel,
  editEvent,
}) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  // Load event details when editing
  useEffect(() => {
    if (editEvent) {
      setName(editEvent.name);
      setDate(editEvent.date);
      setTime(editEvent.time);
      setDescription(editEvent.description || '');
    } else {
      setName('');
      setDate('');
      setTime('');
      setDescription('');
    }
  }, [editEvent]);

  // Save Event
  const handleSave = () => {
    if (!name.trim() || !date.trim() || !time.trim()) {
      Alert.alert(
        'Missing Details',
        'Please fill all required fields.'
      );
      return;
    }

    // Validate Date
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(date)) {
      Alert.alert(
        'Invalid Date',
        'Please use YYYY-MM-DD format.'
      );
      return;
    }

    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    if (
      parsedDate.getUTCFullYear() !== year ||
      parsedDate.getUTCMonth() !== month - 1 ||
      parsedDate.getUTCDate() !== day
    ) {
      Alert.alert('Invalid Date', 'Please enter a valid date.');
      return;
    }

    // Validate Time
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timePattern.test(time)) {
      Alert.alert(
        'Invalid Time',
        'Please use HH:MM format.'
      );
      return;
    }

    onSave({
      name: name.trim(),
      date,
      time,
      description: description.trim(),
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {editEvent ? 'Edit Event' : 'Create Event'}
      </Text>

      <Text style={styles.label}>Event Name *</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Event Date *</Text>

      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Event Time *</Text>

      <TextInput
        style={styles.input}
        placeholder="HH:MM (24-hour format)"
        value={time}
        onChangeText={setTime}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter event description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          {editEvent ? 'Update Event' : 'Save Event'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={onCancel}
      >
        <Text style={styles.cancelText}>
          Back to Home
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    textAlign: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    marginTop: 20,
    alignItems: 'center',
  },

  cancelText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});