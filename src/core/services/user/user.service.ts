import { UserRepository } from '../../repositories/user/user.repository';
import { AppError } from '../../../common/http/responses/error.response';
import { User } from '../../../schema/user/user.schema';

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findMany(): Promise<User[]> {
        return await this.userRepository.findMany();
    }

    async findUnique(id: number): Promise<User | null> {
        const user = await this.userRepository.findUnique({ id });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    async create(data: { name: string, email: string }): Promise<User> {
        const user = await this.userRepository.findUnique({ email: data.email });

        if (user) {
            throw new AppError('Email already in use', 409);
        }

        return await this.userRepository.create(data);
    }

    async update(id: number, params: any): Promise<User> {
        const user = await this.userRepository.findUnique({ id });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this.userRepository.update(id, params);
    }

    async delete(id: number): Promise<User> {
        const user = await this.userRepository.findUnique({ id });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this.userRepository.delete(id);
    }
}