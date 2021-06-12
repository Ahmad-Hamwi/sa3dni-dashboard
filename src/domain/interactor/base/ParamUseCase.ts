export default abstract class ParamUseCase<Param, Result> {

    abstract execute(param: Param): Promise<Result>

}