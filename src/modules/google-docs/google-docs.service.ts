import { BaseApiService } from "@/shared/services";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleDocsService extends BaseApiService {
  constructor(http: HttpService) {
    super(http, "https://docs.google.com/document/d");
  }

  getPublicDocumentContent(documentId: string): Promise<string> {
    return this.get<string>(`${documentId}/export?format=txt`);
  }
}
