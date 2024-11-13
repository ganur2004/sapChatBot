import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private tokenUrl = 'https://q-1-techwins-rj5nyvl2.authentication.eu10.hana.ondemand.com/oauth/token?grant_type=client_credentials';
  private apiUrl = 'https://sap_support-reliable-turtle-xp.cfapps.eu10-005.hana.ondemand.com/find_similar';

  private clientId = 'sb-af3c3d34-47e0-45f4-ba45-630902eb51d5!b513120|aicore!b540';
  private clientSecret = '02a200ee-976f-4512-8a6c-b6f35c89d129$bQq1BYR_YExxQkhLRFf3O1xZFuISrjELmb8jAxV65Ec=';

  constructor(private http: HttpClient) {}

  private getAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/raw'
    });
    const body = 'grant_type=client_credentials';

    return this.http.post(this.tokenUrl, body, { headers });
  }

  public sendRequest(text: string): Observable<any> {
    return new Observable(observer => {
      this.getAccessToken().subscribe(
        tokenData => {
          const token = tokenData.access_token;
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          });
          const threshold = 0.7;
          const body = JSON.stringify({ text, threshold });

          this.http.post("/find_similar", body, { headers }).subscribe(
            response => observer.next(response),
            error => observer.error(error)
          );
        },
        error => observer.error(error)
      );
    });
  }
}
