import { UniqueInputs } from "../../../types/unique.inputs.types";
import { UserFormDto } from "../../../types/dtos/user/user.dto";
import { User } from "../../../schema/user/user.schema";
export interface IUserRepository {

  findMany(): Promise<User[]>;
  findUnique(UniqueInputs: UniqueInputs["User"]): Promise<User | null>;
  create(data: UserFormDto): Promise<User>;
  update(UniqueInputs: UniqueInputs["User"], data: UserFormDto): Promise<User>;
  delete(UniqueInputs: UniqueInputs["User"]): Promise<User>;
}