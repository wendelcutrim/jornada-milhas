import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { hashSync } from 'bcryptjs';

const SALT = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) {}

    private salt = SALT;

    async findOne(email: string) {
        return this.repository.findOne({
            where: { email },
            relations: ['estado'],
        });
    }
    create(userDto: UserDto) {
        const hash = hashSync(userDto.senha, this.salt);
        userDto.senha = hash;

        return this.repository.save(userDto);
    }
    update(id: number, updateUserDto: UserDto) {
        updateUserDto.senha = hashSync(updateUserDto.senha, this.salt);
        return this.repository.update(id, updateUserDto);
    }
}
