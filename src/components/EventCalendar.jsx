import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { fetchAllEventsSelector } from '../store/atoms';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Text } from '@mantine/core';

export const getEventStartDates = (events) => {
  return events.map(event => new Date(event.eventStartTime._seconds * 1000));
};

export const getEventNameAndDate = (events) => {
  return events.map(event => ({
    date: new Date(event.eventStartTime._seconds * 1000),
    name: event.name
  }));
};

// Define CSS within the same file using a template literal
const styles = `
  .highlight {
    background: orange !important;
    color: white !important;
  }
`;

const EventCalendar = () => {
  const [dates, setDates] = useState([]);
  const [nameAndDates, setNameAndDates] = useState([]);

  // Fetch all events synchronously outside useEffect
  const allEvents = useRecoilValue(fetchAllEventsSelector);
  const initialDates = getEventStartDates(allEvents);
  const initialNameAndDates = getEventNameAndDate(allEvents);

  useEffect(() => {
    // Set initial dates and nameAndDates fetched synchronously
    setDates(initialDates);
    setNameAndDates(initialNameAndDates);
  }, [initialDates, initialNameAndDates]); // Ensure useEffect runs when initialDates and initialNameAndDates change

  const isHighlighted = (date) => {
    return nameAndDates.some(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isHighlighted(date)) {
      return 'highlight';
    }
    return null;
  };

  // Insert the styles using a template literal
  return (
    <>
      <style>{styles}</style>
      <Calendar tileClassName={tileClassName}/>
      {nameAndDates?.map((evt, index) => {
        return (
          <Text key={index}>
            {evt.name} - {evt.date.toDateString()}
          </Text>
        )
      })}
    </>
  );
}

export default EventCalendar;
