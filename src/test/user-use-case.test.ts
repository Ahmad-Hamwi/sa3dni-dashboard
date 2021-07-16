import {inject, resolve, resolveRepository} from "../di/injection";


test("Get User Details", async () => {
  inject();

  const userRepository = resolveRepository.users();

  const user = await userRepository.get("asdasd");

  console.log(user);
}, 1000000);
