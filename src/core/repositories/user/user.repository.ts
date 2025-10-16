import { IUserRepository } from "../user/user.repository.interface";
import { UniqueInputs } from '../../../types/unique.inputs.types';
import { UserFormDto } from "../../../types/dtos/user/user.dto";
import { User } from "../../../schema/user/user.schema";
import { db } from "../../../config/database.config";

export class UserRepository implements IUserRepository {
    async findMany(): Promise<User[]> {
        const query = `SELECT * FROM users`;
        const result = await db.query(query);
        return result.rows;
    }

    async findUnique(UniqueInputs: UniqueInputs['User']): Promise<User | null> {
        const query = `SELECT * FROM users WHERE id = $1 OR email = $2`;
        const result = await db.query(query, [UniqueInputs.id, UniqueInputs.email]);
        return result.rows[0] || null;
    }

    async create(data: UserFormDto): Promise<User> {
        const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
        const result = await db.query(query, [data.name, data.email]);
        return result.rows[0];
    }

    async update(UniqueInputs: UniqueInputs['User'], data: UserFormDto): Promise<User> {
        const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 OR email = $4 RETURNING *`;
        const result = await db.query(query, [data.name, data.email, UniqueInputs.id, UniqueInputs.email]);
        return result.rows[0];
    }

    async delete(UniqueInputs: UniqueInputs['User']): Promise<User> {
        const query = `DELETE FROM users WHERE id = $1 OR email = $2 RETURNING *`;
        const result = await db.query(query, [UniqueInputs.id, UniqueInputs.email]);
        return result.rows[0];
    }
}