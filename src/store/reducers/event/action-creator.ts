import { EventActionEnum, SetEventsAction, SetGuestAction } from "./types";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/iUser";
import { AppDispatch } from "../../index";
import axios from "axios";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
  setEvent: (payload: IEvent[]): SetEventsAction => ({ type: EventActionEnum.SET_EVENTS, payload }),
  setGuest: (payload: IUser[]): SetGuestAction => ({ type: EventActionEnum.SET_GUESTS, payload }),
  fetchGuest: () => async (dispatch: AppDispatch) => {
    try {
      const response = await UserService.getUsers()
      dispatch(EventActionCreators.setGuest(response.data))
    } catch (e) {
      console.debug(e)
    }
  },
  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    console.debug(event)
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      json.push(event)
      dispatch(EventActionCreators.setEvent(json))
      localStorage.setItem('events', JSON.stringify(json))
    } catch (e) {
      console.debug(e)
    }
  },
  fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as IEvent[]
      const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
      dispatch(EventActionCreators.setEvent(currentUserEvents))
    } catch (e) {
      console.debug(e)
    }
  }
}