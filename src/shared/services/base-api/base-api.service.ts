import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class BaseApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {}

  get<T>(endpoint: string): Observable<T> {
    return this.httpService.get<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data));
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.httpService.post<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data));
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.httpService.patch<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.httpService.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data));
  }
}
