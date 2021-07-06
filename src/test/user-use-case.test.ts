import { inject, resolve } from "../di/injection";
import GetUserDetailsUseCase from "../domain/interactor/user/GetUserDetailsUseCase";

test("Get User Details", async () => {
  inject();

  const getUserDetailsUseCaseTest = resolve<GetUserDetailsUseCase>(
    GetUserDetailsUseCase
  );

  const userResult = await getUserDetailsUseCaseTest.execute({});

  console.log("Result", userResult);

  expect(userResult).toEqual({});
}, 1000000);
