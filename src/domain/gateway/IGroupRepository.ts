import Group from "../entity/Group";

export default interface IGroupRepository {
  getAll(): Promise<Array<Group>>;

  get(id: string): Promise<Group | null>;

  delete(id: string): Promise<boolean>;

  create(param: CreateGroupParams): Promise<Group>;
}

export const INJECT_GROUP_REPOSITORY = "INJECT_GROUP_REPOSITORY";

export type CreateGroupParams = {
  name: string;
  members: string[];
};