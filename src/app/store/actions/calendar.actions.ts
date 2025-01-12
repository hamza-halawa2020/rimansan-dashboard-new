import { createAction, props } from '@ngrx/store';

export const fetchEvents = createAction('[Calendar] Fetch Events');
export const fetchEventsSuccess = createAction(
  '[Calendar] Fetch Events Success',
  props<{ events: any[] }>()
);
export const fetchEventsFailure = createAction(
  '[Data] Fetch Events Failure',
  props<{ error: string }>()
);

export const addEvent = createAction(
  '[Calendar] Add Event',
  props<{ event: any }>()
);
export const updateEventsSuccess = createAction(
  '[Calendar] Add Event',
  props<{ event: any }>()
);
export const deleteEvent = createAction(
  '[Calendar] Delete Event',
  props<{ eventId: string }>()
);
