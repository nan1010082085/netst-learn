import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';
import { PublicRoute } from '../../decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Get()
  getAuth() {
    return 'test auth api successful';
  }

  @PublicRoute()
  @Post('login')
  login(@Body() dto: any) {
    const { username, password } = dto;
    return this.authService.login(username, password);
  }

  @Post('logout')
  logout(@Body() dto: any, @Headers() headers) {
    // log(headers);
    return this.authService.logout(dto);
  }
}
