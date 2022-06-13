import React, { FC, useEffect, useState } from 'react';
import EventCalendar from "../components/EventCalendar";
import { Button, Layout, Row, Modal } from "antd";
import EventForm from "../components/EventForm";
import { useDispatch } from "react-redux";
import { EventActionCreators } from "../store/reducers/event/action-creator";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";


const Event: FC = () => {
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const dispatch = useDispatch()
  const { guests, events } = useTypedSelector(state => state.event)
  const { user } = useTypedSelector(state => state.auth)

  useEffect(() => {
    dispatch(EventActionCreators.fetchGuest())
    dispatch(EventActionCreators.fetchEvents(user.username))
  }, [])

  const addNewEvent = (event: IEvent) => {
    dispatch(EventActionCreators.createEvent(event))
    setIsModalVisible(false)
  }

  return (
    <Layout>
      <EventCalendar events={ events }/>
      <Row justify="center">
        <Button type="primary" onClick={ () => setIsModalVisible(true) }>Add event</Button>
      </Row>
      <Modal title="New Event"
             visible={ isModalVisible }
             footer={ null }
             onCancel={ () => setIsModalVisible(false) }>
        <EventForm
          guests={ guests }
          submit={ addNewEvent }
        />
      </Modal>
    </Layout>
  );
};

export default Event;