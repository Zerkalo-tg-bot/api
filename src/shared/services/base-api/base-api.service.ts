import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable()
export class BaseApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly baseUrl: string,
  ) {}

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @param endpoint The API endpoint to send the GET request to
   * @returns A promise that resolves to the response data of type T
   */
  get<T>(endpoint: string): Promise<T> {
    return firstValueFrom(this.httpService.get<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data))).catch(
      (error) => {
        throw new Error(`Failed to GET from API endpoint ${endpoint}:\n${error.message}`);
      },
    );
  }

  /**
   * Sends a POST request to the specified endpoint with the given data.
   *
   * @param endpoint The API endpoint to send the POST request to
   * @param data The data to include in the POST request body
   * @returns A promise that resolves to the response data of type T
   */
  post<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(
      this.httpService.post<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data)),
    ).catch((error) => {
      throw new Error(`Failed to POST to API endpoint ${endpoint}:\n${error.message}`);
    });
  }

  /**
   * Sends a PATCH request to the specified endpoint with the given data.
   *
   * @param endpoint The API endpoint to send the PATCH request to
   * @param data The data to include in the PATCH request body
   * @returns A promise that resolves to the response data of type T
   */
  patch<T>(endpoint: string, data: any): Promise<T> {
    return firstValueFrom(
      this.httpService.patch<T>(`${this.baseUrl}/${endpoint}`, data).pipe(map((response) => response.data)),
    ).catch((error) => {
      throw new Error(`Failed to PATCH to API endpoint ${endpoint}:\n${error.message}`);
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @param endpoint The API endpoint to send the DELETE request to
   * @returns A promise that resolves to the response data of type T
   */
  delete<T>(endpoint: string): Promise<T> {
    return firstValueFrom(this.httpService.delete<T>(`${this.baseUrl}/${endpoint}`).pipe(map((response) => response.data))).catch(
      (error) => {
        throw new Error(`Failed to DELETE from API endpoint ${endpoint}:\n${error.message}`);
      },
    );
  }
}
