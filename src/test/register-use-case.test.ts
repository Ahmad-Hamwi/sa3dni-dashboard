import RegisterUseCase from "../domain/interactor/auth/RegisterUseCase";
import { inject, resolve } from "../di/injection";

test(
  "Register UseCase",
  async () => {
    inject();
    const registerUseCaseTest = resolve<RegisterUseCase>(RegisterUseCase);

    const result = await registerUseCaseTest.execute({
      email: "teara291@gmail.com",
      password: "1234566",
      phoneNumber: "+9612312123",
      companyName: "comapny",
      fullName: "AhmadHamwi",
    });

    console.log("Success", result);

    expect(result).toEqual({});
  },
  3 * 60 * 1000
);
