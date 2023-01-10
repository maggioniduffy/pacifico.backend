import { AuthService } from './../services/auth.service';
import { Controller, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Public } from 'src/public.decorator';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.verbose('req: ', req);
    return req.user;
  }
}
