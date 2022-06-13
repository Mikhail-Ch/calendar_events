import React, { FC } from 'react';
import { Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formattedDate } from "../utils/formatedDate";

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar:FC<EventCalendarProps> = (props) => {

  const dateCellRender = (value: Moment) => {
    const date = formattedDate(value.toDate())
    const currentDayEvents = props.events.filter(ev => ev.date === date)

    return (
      <ul className="events">
        {currentDayEvents.map((item, i) => (
          <li key={i}>
            {item.description}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Calendar dateCellRender={dateCellRender} />
  );
};

export default EventCalendar;