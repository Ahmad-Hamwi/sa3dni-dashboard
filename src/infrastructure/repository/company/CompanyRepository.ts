import IApiClient from "../../provider/api/client/IApiClinet";
import { API_ENDPOINTS } from "../../remote/config";
import { BaseResponse } from "../../remote/model/BaseResponse";
import ICompanyRepository from "./ICompanyRepository";

export default class CompanyRepository implements ICompanyRepository {
  constructor(private readonly api: IApiClient) {}

  async getCompanyApiKey(): Promise<string> {
    const response = await this.api.get<BaseResponse<{ apiKey: string }>>(
      API_ENDPOINTS.company
    );

    console.log(response);
    return response.data.data.apiKey;
  }
}
