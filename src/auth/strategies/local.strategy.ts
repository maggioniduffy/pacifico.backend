import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('LocalStrategy');
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('aaaaa');
    console.log('username: ', username, password);
    this.logger.verbose('VALIDATE');
    const user = await this.authService.validateUser(username, password);
    this.logger.verbose('user: ', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
