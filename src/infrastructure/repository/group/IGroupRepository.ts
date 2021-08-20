import GroupModel from "../../model/GroupModel";

export default interface IGroupRepository {
  getAll(): Promise<Array<GroupModel>>;

  get(id: string): Promise<GroupModel | null>;

  delete(id: string): Promise<boolean>;

  create(param: CreateGroupParams): Promise<GroupModel>;
}

export const INJECT_GROUP_REPOSITORY = "INJECT_GROUP_REPOSITORY";

export type CreateGroupParams = {
  name: string;
  members: string[];
};