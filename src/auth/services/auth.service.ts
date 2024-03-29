import { LoginDto } from './../dtos/login.dto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dtos/signup.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    this.logger.verbose('USER: ', user.username, user._id);
    const payload = { username: user.username, sub: user.userId };
    this.logger.verbose('Payload:', payload);
    const token = {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get(
          'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
        )}s`,
      }),
    };
    return {
      token: token.access_token,
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}`,
    };
  }

  async signup(user: SignupDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    return await this.usersService.createOne(user.username, user.email, hash);
  }
}
