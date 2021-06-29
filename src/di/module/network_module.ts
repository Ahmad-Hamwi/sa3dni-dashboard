import IApiExceptionFactory, {
  INJECT_API_EXCEPTION_FACTORY,
} from "../../infrastructure/remote/exception/IApiExceptionFactory";
import ApiExceptionFactory from "../../infrastructure/remote/exception/ApiExceptionFactory";
import IApiClient, {
  INJECT_API_CLIENT,
} from "../../infrastructure/provider/api/client/IApiClinet";
import AxiosApiClient from "../../infrastructure/provider/api/client/AxiosApiClient";
import axios, { AxiosInstance } from "axios";
import { API_BASE_URL } from "../../infrastructure/remote/constants/remote_constants";
import AuthorizationInterceptor from "../../infrastructure/provider/api/interceptor/AuthorizationInterceptor";
import IRequestInterceptor from "../../infrastructure/provider/api/interceptor/base/IRequestInterceptor";
import IContainer from "../container/IContainer";
import { resolve } from "../injection";
import IAppCache, {
  INJECT_APP_CACHE,
} from "../../infrastructure/local/cache/IAppCache";

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
    return new AxiosApiClient(c.resolve<AxiosInstance>(INJECT_AXIOS_CLIENT));
  });
}

function getAxiosClient(container: IContainer): AxiosInstance {
  registerInterceptors(container);

  const client = axios.create({
    baseURL: API_BASE_URL,
  });

  getInterceptors().forEach((interceptor) => {
    client.interceptors.request.use((request) =>
      interceptor.intercept(request)
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
}

function getInterceptors(): IRequestInterceptor[] {
  return [resolve<AuthorizationInterceptor>(AuthorizationInterceptor)];
}