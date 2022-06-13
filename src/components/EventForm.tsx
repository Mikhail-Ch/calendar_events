import React, { FC, useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from "antd";
import { IUser } from "../models/iUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formattedDate } from "../utils/formatedDate";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface EventFormProps {
  guests: IUser[]
  submit: (event: IEvent) => void
}


const EventForm: FC<EventFormProps> = (props) => {
  const [ event, setEvent ] = useState<IEvent>({
    author: "",
    description: "",
    date: "",
    guest: ""
  } as IEvent)

  const { user } = useTypedSelector(state => state.auth)

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formattedDate(date.toDate()) })
    }
  }

  const handleSubmit = () => {
    props.submit({...event, author: user.username})
  }

  return (
    <Form layout="vertical"
          onFinish={ handleSubmit }
    >
      <Form.Item
        label="Название события"
        name="description"
        rules={ [ { required: true, message: 'Заполните название' } ] }
      >
        <Input
          value={ event.description }
          onChange={ (e) => setEvent({ ...event, description: e.target.value }) }
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={ [ { required: true, message: 'Заполните дату' } ] }>
        <DatePicker
          onChange={ (date) => selectDate(date) }
        />
      </Form.Item>
      <Form.Item
        label="Пользователь"
        name="guest"
        rules={ [ { required: true, message: 'Обязательное поле' } ] }
      >
        <Select
          onChange={ (guest: string) => setEvent({ ...event, guest }) }
        >
          {
            props.guests.map(guest =>
              <Select.Option value={ guest.username } key={ guest.username }>
                { guest.username }
              </Select.Option>
            )
          }
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать событие
        </Button>
        <Button htmlType="button" style={ { margin: '0 10px' } }>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;