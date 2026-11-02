import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import EventForm from './src/components/EventForm';
import EventList from './src/components/EventList';

export default function App() {

  // Store events without a database
  const [events, setEvents] = useState([]);

  // Show home or form
  const [showForm, setShowForm] = useState(false);

  // Selected event for editing
  const [editEvent, setEditEvent] = useState(null);

  // Open Add Event Form
  const handleAddEvent = () => {
    setEditEvent(null);
    setShowForm(true);
  };

  // Save New Event or Update Existing Event
  const handleSaveEvent = (eventData) => {

    if (editEvent) {

      // Update existing event
      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event.id === editEvent.id
            ? { ...event, ...eventData }
            : event
        )
      );

      Alert.alert(
        'Success',
        'Event updated successfully!'
      );

    } else {

      // Create a new event
      const newEvent = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        ...eventData,
      };

      setEvents((previousEvents) => [
        ...previousEvents,
        newEvent,
      ]);

      Alert.alert(
        'Success',
        'Event added successfully!'
      );
    }

    setShowForm(false);
    setEditEvent(null);
  };

  // Edit Event
  const handleEditEvent = (event) => {
    setEditEvent(event);
    setShowForm(true);
  };

  // Delete Event
  const handleDeleteEvent = (id) => {

    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setEvents((previousEvents) =>
              previousEvents.filter(
                (event) => event.id !== id
              )
            );
          },
        },
      ]
    );
  };

  // Back to Home
  const handleCancel = () => {
    setShowForm(false);
    setEditEvent(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        backgroundColor="#6C63FF"
        barStyle="light-content"
      />

      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          📅 Event Planner
        </Text>

        <Text style={styles.headerSubtitle}>
          Plan your events easily!
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >

        {showForm ? (

          // Add or Edit Event Screen
          <EventForm
            onSave={handleSaveEvent}
            onCancel={handleCancel}
            editEvent={editEvent}
          />

        ) : (

          // Home Screen
          <View>

            {/* Welcome Section */}
            <View style={styles.welcomeCard}>

              <Text style={styles.welcomeTitle}>
                Welcome Back! 👋
              </Text>

              <Text style={styles.welcomeText}>
                Organize your important events in one place.
              </Text>

              <Text style={styles.totalEvents}>
                Total Events: {events.length}
              </Text>

            </View>

            {/* Add Event Button */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddEvent}
            >
              <Text style={styles.addButtonText}>
                + Add New Event
              </Text>
            </TouchableOpacity>

            {/* Event List */}
            <EventList
              events={events}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />

          </View>

        )}

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingTop: Platform.OS === 'android'
      ? StatusBar.currentHeight
      : 0,
  },

  header: {
    backgroundColor: '#6C63FF',
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#EAE8FF',
    marginTop: 8,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  welcomeCard: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 3,
  },

  welcomeTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1E1E2F',
    marginBottom: 10,
  },

  welcomeText: {
    fontSize: 15,
    color: '#777777',
    lineHeight: 23,
    marginBottom: 15,
  },

  totalEvents: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
  },

  addButton: {
    backgroundColor: '#6C63FF',
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 3,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

});