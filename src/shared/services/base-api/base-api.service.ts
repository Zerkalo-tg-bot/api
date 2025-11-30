import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable()
export class BaseApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {}

  get<T>(endpoint: string): Promise<T> {
    return firstValueFrom(this.httpService.get<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data)));
  }

  post<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(this.httpService.post<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data)));
  }

  patch<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(this.httpService.patch<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data)));
  }

  delete<T>(endpoint: string): Promise<T> {
    return firstValueFrom(this.httpService.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data)));
  }
}
