import { EventAction, EventActionEnum, EventState } from "./types";

const initialState: EventState = {
  guests: [],
  events: []
}

export default function EventReducer(state = initialState, action: EventAction) {
  switch (action.type) {
    case EventActionEnum.SET_EVENTS:
      return {
        ...state,
        events: action.payload
      }
    case EventActionEnum.SET_GUESTS:
      return {
        ...state,
        guests: action.payload
      }
    default:
      return state
  }
}