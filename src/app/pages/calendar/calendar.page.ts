import { Component, OnInit, ViewChild } from '@angular/core';

import { CalendarService } from '../../services/calendar.service';

import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {

  @ViewChild('fullcalendar', { static: false }) fullcalendar: FullCalendarComponent;
  public calendarOptions: CalendarOptions;

  public allEvents: any[] = [];
  public eventsCalendar: any[] = [];

  constructor(private calendarServices: CalendarService) { }

  public async ionViewWillEnter(): Promise<void> {
    this.eventsCalendar = [];
    this.allEvents = await this.calendarServices.fetchEventsCalendar('');
    this.allEvents.map(x => {
      const date = {
        id: x.id,
        title: x.event_name,
        start: x.date_event_start + 'T' + x.hour_event,
        end: x.date_event_end + 'T' + x.hour_event_finish
      };
      this.eventsCalendar.push(date);
    });
    this.fullcalendar?.getApi()?.render();
    this.calendarOptions = this.initCalendar();
  }

  public initCalendar(): CalendarOptions {
    return {
      plugins: [timeGridPlugin, interactionPlugin, dayGridPlugin],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridDay,timeGridWeek'
      },
      editable: true,
      events: [...this.eventsCalendar],
    };
  }

}
