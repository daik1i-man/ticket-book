import { User } from "../../../schema/user/user.schema";
export interface IUserRepository {

  findMany(): Promise<User[]>;
  findUnique(data: { id?: number, email?: string }): Promise<User | null>;
  create(data: { name: string, email: string }): Promise<User>;
  update(id: number, data: { name: string, email: string }): Promise<User>;
  delete(id: number): Promise<User>;
}