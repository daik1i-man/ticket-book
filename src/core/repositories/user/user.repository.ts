import { IUserRepository } from "../user/user.repository.interface";
import { User } from "../../../schema/user/user.schema";
import { db } from "../../../config/database.config";

export class UserRepository implements IUserRepository {
    async findMany(): Promise<User[]> {
        const query = `SELECT * FROM users`;
        const result = await db.query(query);
        return result.rows;
    }

    async findUnique(data: { id?: number, email?: string }): Promise<User | null> {
        const query = `SELECT * FROM users WHERE id = $1 OR email = $2`;
        const result = await db.query(query, [data.id, data.email]);
        return result.rows[0] || null;
    }

    async create(data: { name: string, email: string }): Promise<User> {
        const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`;
        const result = await db.query(query, [data.name, data.email]);
        return result.rows[0];
    }

    async update(id: number, data: { name: string, email: string }): Promise<User> {
        const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`;
        const result = await db.query(query, [data.name, data.email, id]);
        return result.rows[0];
    }

    async delete(id: number): Promise<User> {
        const query = `DELETE FROM users WHERE id = $1 RETURNING *`;
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
}