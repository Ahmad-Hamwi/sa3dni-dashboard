export default interface ICompanyRepository {
    getCompanyApiKey(): Promise<string>;
}

export const INJECT_COMPANY_REPOSITORY = "INJECT_COMPANY_REPOSITORY";