import { SignupDto } from './auth/dtos/signup.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/services/auth.service';
import { Public } from './public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @Public()
  //@UseGuards(AuthGuard('local'))
  @Post('auth/signup')
  async signup(@Body() req: SignupDto) {
    console.log(req);
    return this.authService.signup(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get()
  hello() {
    return 'Welcome';
  }
}
