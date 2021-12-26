import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public url = 'https://propertyapp.amazing-wright.137-184-198-32.plesk.page/public/events';

  constructor(private http: HttpClient) { }

  public async fetchEventsCalendar(id: string): Promise<any[]> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Cache-Control': 'no-cache',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Pragma: 'no-cache',
      ph: '1',
      build: '1',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      PropertyAppToken: '123'
    });
    return await this.http.get<any[]>(`${this.url}/${id}`, { headers }).toPromise();
  }
}
