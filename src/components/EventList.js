import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import EventItem from './EventItem';

export default function EventList({
  events,
  onEdit,
  onDelete,
}) {

  const [searchText, setSearchText] = useState('');
  const [eventFilter, setEventFilter] = useState('All');

  // Check event status
  const getEventStatus = (event) => {
    const eventDateTime = new Date(
      `${event.date}T${event.time}:00`
    );

    return eventDateTime < new Date()
      ? 'Completed'
      : 'Upcoming';
  };

  // Search and Filter Events
  const filteredEvents = events
    .filter((event) => {

      const search = searchText.trim().toLowerCase();

      const matchesSearch =
        event.name.toLowerCase().includes(search) ||
        (event.description || '').toLowerCase().includes(search);

      const status = getEventStatus(event);

      const matchesFilter =
        eventFilter === 'All' ||
        status === eventFilter;

      return matchesSearch && matchesFilter;

    })
    .sort((a, b) => {
      const dateA = `${a.date}T${a.time}`;
      const dateB = `${b.date}T${b.time}`;

      return dateA.localeCompare(dateB);
    });

  return (
    <View style={styles.container}>

      {/* Section Title */}
      <Text style={styles.title}>
        My Events
      </Text>

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>

        {['All', 'Upcoming', 'Completed'].map((filter) => (

          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              eventFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setEventFilter(filter)}
          >

            <Text
              style={[
                styles.filterText,
                eventFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* Total Events */}
      <Text style={styles.countText}>
        Showing {filteredEvents.length} event(s)
      </Text>

      {/* Event List */}
      {filteredEvents.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyIcon}>
            📅
          </Text>

          <Text style={styles.emptyTitle}>
            No Events Found
          </Text>

          <Text style={styles.emptyMessage}>
            Add a new event or change your search.
          </Text>

        </View>

      ) : (

        filteredEvents.map((event) => (

          <EventItem
            key={event.id}
            event={event}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginTop: 25,
  },

  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1E1E2F',
    marginBottom: 18,
  },

  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  filterButton: {
    backgroundColor: '#E8E8F0',
    paddingVertical: 12,
    width: '32%',
    borderRadius: 10,
    alignItems: 'center',
  },

  activeFilterButton: {
    backgroundColor: '#6C63FF',
  },

  filterText: {
    color: '#444444',
    fontSize: 13,
    fontWeight: 'bold',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  countText: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 15,
  },

  emptyContainer: {
    backgroundColor: '#FFFFFF',
    padding: 35,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333333',
  },

  emptyMessage: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 10,
  },

});