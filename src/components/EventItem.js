import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function EventItem({ event, onEdit, onDelete }) {

  // Check event status
  const getEventStatus = () => {
    const eventDateTime = new Date(
      `${event.date}T${event.time}:00`
    );

    return eventDateTime < new Date()
      ? 'Completed'
      : 'Upcoming';
  };

  const status = getEventStatus();

  return (
    <View style={styles.card}>

      {/* Event Name */}
      <Text style={styles.eventName}>
        {event.name}
      </Text>

      {/* Event Date */}
      <Text style={styles.details}>
        📅 {event.date}
      </Text>

      {/* Event Time */}
      <Text style={styles.details}>
        🕒 {event.time}
      </Text>

      {/* Event Description */}
      {event.description ? (
        <Text style={styles.description}>
          {event.description}
        </Text>
      ) : null}

      {/* Event Status */}
      <View
        style={[
          styles.statusContainer,
          status === 'Upcoming'
            ? styles.upcomingBackground
            : styles.completedBackground,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color: status === 'Upcoming'
                ? '#28A745'
                : '#FF5252',
            },
          ]}
        >
          {status === 'Upcoming'
            ? '● Upcoming'
            : '● Completed'}
        </Text>
      </View>

      {/* Edit and Delete Buttons */}
      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(event)}
        >
          <Text style={styles.buttonText}>
            ✏️ Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(event.id)}
        >
          <Text style={styles.buttonText}>
            🗑️ Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#6C63FF',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  eventName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1E1E2F',
    marginBottom: 12,
  },

  details: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
    marginBottom: 12,
    lineHeight: 21,
  },

  statusContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 8,
  },

  upcomingBackground: {
    backgroundColor: '#E8F5E9',
  },

  completedBackground: {
    backgroundColor: '#FFEBEE',
  },

  statusText: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  editButton: {
    backgroundColor: '#6C63FF',
    padding: 13,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 13,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

});
