export default abstract class UseCase<Response> {
  abstract execute(): Promise<Response>;
}