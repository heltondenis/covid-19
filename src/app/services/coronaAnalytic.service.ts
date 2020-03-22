import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoronaAnalyticService {

public readonly environment = environment;

constructor(private http: HttpClient) { }

  getAllData():any {
  return this.http.get(environment.api);

  }
}
