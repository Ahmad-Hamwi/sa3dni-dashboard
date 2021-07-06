import IApiExceptionFactory, {
  INJECT_API_EXCEPTION_FACTORY,
} from "../../infrastructure/remote/exception/IApiExceptionFactory";
import ApiExceptionFactory from "../../infrastructure/remote/exception/ApiExceptionFactory";
import IApiClient, {
  INJECT_API_CLIENT,
} from "../../infrastructure/provider/api/client/IApiClinet";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import AuthorizationInterceptor from "../../infrastructure/remote/interceptor/AuthorizationInterceptor";
import IRequestInterceptor from "../../infrastructure/provider/api/interceptor/IRequestInterceptor";
import IContainer from "../container/IContainer";
import { resolve } from "../injection";
import IAppCache, {
  INJECT_APP_CACHE,
} from "../../infrastructure/local/cache/IAppCache";
import { API_CONFIG } from "../../infrastructure/remote/config";
import AxiosApiClientProxy from "../../infrastructure/remote/AxiosApiClientProxy";
import {
  LoggingRequestInterceptor,
  LoggingResponseInterceptor,
} from "../../infrastructure/remote/interceptor/LoggingInterceptor";
import IResponseInterceptor from "../../infrastructure/provider/api/interceptor/IResponseInterceptor";

export const INJECT_AXIOS_CLIENT = "INJECT_AXIOS_CLIENT";

export function registerNetwork(container: IContainer) {
  container.registerLazySingleton<IApiExceptionFactory>(
    INJECT_API_EXCEPTION_FACTORY,
    (c) => {
      return new ApiExceptionFactory();
    }
  );

  container.register<AxiosInstance>(INJECT_AXIOS_CLIENT, getAxiosClient);

  container.registerLazySingleton<IApiClient>(INJECT_API_CLIENT, (c) => {
    return new AxiosApiClientProxy(
      c.resolve<IApiExceptionFactory>(INJECT_API_EXCEPTION_FACTORY),
      c.resolve<AxiosInstance>(INJECT_AXIOS_CLIENT)
    );
  });
}

function getAxiosClient(container: IContainer): AxiosInstance {
  registerInterceptors(container);

  const client = axios.create({
    baseURL: API_CONFIG.base,
  });

  getRequestInterceptors().forEach((interceptor) => {
    client.interceptors.request.use((request) =>
      interceptor.intercept(request)
    );
  });

  getResponseInterceptors().forEach((interceptor) => {
    client.interceptors.response.use((response) =>
      interceptor.intercept(response)
    );
  });

  return client;
}

function registerInterceptors(container: IContainer): void {
  container.register<AuthorizationInterceptor>(
    AuthorizationInterceptor,
    (c) => {
      return new AuthorizationInterceptor(
        c.resolve<IAppCache>(INJECT_APP_CACHE)
      );
    }
  );

  container.register<LoggingRequestInterceptor>(
    LoggingRequestInterceptor,
    (c) => {
      return new LoggingRequestInterceptor();
    }
  );

  container.register<LoggingResponseInterceptor>(
    LoggingResponseInterceptor,
    (c) => {
      return new LoggingResponseInterceptor();
    }
  );
}

function getRequestInterceptors(): IRequestInterceptor[] {
  return [
    resolve<AuthorizationInterceptor>(AuthorizationInterceptor),
    resolve<LoggingRequestInterceptor>(LoggingRequestInterceptor),
  ];
}

function getResponseInterceptors(): IResponseInterceptor[] {
  return [resolve<LoggingResponseInterceptor>(LoggingResponseInterceptor)];
}
