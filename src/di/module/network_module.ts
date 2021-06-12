import {DependencyContainer} from "tsyringe";
import IApiExceptionFactory, {INJECT_API_EXCEPTION_FACTORY} from "../../infrastructure/remote/exception/IApiExceptionFactory";
import ApiExceptionFactory from "../../infrastructure/remote/exception/ApiExceptionFactory";
import IApiClient, {INJECT_API_CLIENT} from "../../infrastructure/provider/api/client/IApiClient";
import AxiosApiClient from "../../infrastructure/provider/api/client/AxiosApiClient";
import axios, {AxiosInstance} from "axios";
import {API_BASE_URL} from "../../infrastructure/remote/constants/remote_constants";
import AuthorizationInterceptor from "../../infrastructure/provider/api/interceptor/AuthorizationInterceptor";
import IRequestInterceptor from "../../infrastructure/provider/api/interceptor/base/IRequestInterceptor";

export const INJECT_AXIOS_CLIENT = "INJECT_AXIOS_CLIENT";

export function registerNetwork(container: DependencyContainer) {
    container.registerSingleton<IApiExceptionFactory>(INJECT_API_EXCEPTION_FACTORY, ApiExceptionFactory)
        .register<AuthorizationInterceptor>(AuthorizationInterceptor, AuthorizationInterceptor)
        .register<AxiosInstance>(INJECT_AXIOS_CLIENT, {useValue: getAxiosClient()})
        .registerSingleton<IApiClient>(INJECT_API_CLIENT, AxiosApiClient)

}

function getAxiosClient(): AxiosInstance {
    const client = axios.create({
        baseURL: API_BASE_URL,
    });


    getInterceptors()
        .forEach(interceptor => {
            client.interceptors.request.use((request) => interceptor.intercept(request));
        });


    return client;
}

function getInterceptors(): IRequestInterceptor[] {
    return [
        // resolve<AuthorizationInterceptor>(AuthorizationInterceptor)
    ];
}