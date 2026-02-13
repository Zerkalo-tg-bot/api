import { BaseApiService } from "@/shared/services";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleDocsService extends BaseApiService {
  constructor(http: HttpService) {
    super(http, "https://docs.google.com/document/d");
  }

  /**
   * Retrieves the content of a public Google Docs document as plain text.
   *
   * @param documentId The ID of the Google Docs document
   * @returns A promise that resolves to the plain text content of the document
   */
  async getPublicDocumentContent(documentId: string) {
    try {
      const document = await this.get<string>(`${documentId}/export?format=txt`);
      return document;
    } catch (error) {
      throw new Error(`Failed to fetch document content for document ID ${documentId}`, {
        cause: error.message,
      });
    }
  }
}
