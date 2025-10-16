import { UserRepository } from '../../repositories/user/user.repository';
import { AppError } from '../../../common/http/responses/error.response';
import { UniqueInputs } from '../../../types/unique.inputs.types';
import { UserFormDto } from '../../../types/dtos/user/user.dto';
import { User } from '../../../schema/user/user.schema';

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findMany(): Promise<User[]> {
        return await this.userRepository.findMany();
    }

    async findUnique(UniqueInputs: UniqueInputs['User']): Promise<User | null> {
        const user = await this.userRepository.findUnique(UniqueInputs);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return user;
    }

    async create(data: UserFormDto): Promise<User> {
        const user = await this.userRepository.findUnique({ email: data.email });

        if (user) {
            throw new AppError('Email already in use', 409);
        }

        return await this.userRepository.create(data);
    }

    async update(UniqueInputs: UniqueInputs['User'], params: UserFormDto): Promise<User> {
        const user = await this.userRepository.findUnique(UniqueInputs);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this.userRepository.update(UniqueInputs, params);
    }

    async delete(UniqueInputs: UniqueInputs['User']): Promise<User> {
        const user = await this.userRepository.findUnique(UniqueInputs);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this.userRepository.delete(UniqueInputs);
    }
}