import { Controller, Post, Body } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { PublicUserDto } from '@/features/users/dto/public-user.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered with JWT token',
    schema: {
      type: 'object',
      properties: {
        user: { $ref: getSchemaPath(PublicUserDto) },
        token: { type: 'string' },
      },
    },
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Throttle({
    login: {
      limit: 5,
      ttl: 60,
    },
  })
  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiResponse({
    status: 200,
    description: 'User logged in with JWT token',
    schema: {
      type: 'object',
      properties: {
        user: { $ref: getSchemaPath(PublicUserDto) },
        token: { type: 'string' },
      },
    },
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }
}