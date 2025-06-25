// src/shared/interceptors/register-rate-limit.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'

const ipRegisterTimestamps = new Map<string, number>()

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const ip = request.ip || request.connection.remoteAddress

    const now = Date.now()
    const lastAttempt = ipRegisterTimestamps.get(ip)

    const LIMIT_TIME = 30 * 1000

    if (lastAttempt && now - lastAttempt < LIMIT_TIME) {
      throw new HttpException(
        'Too many registration attempts. Please wait a few seconds.',
        HttpStatus.TOO_MANY_REQUESTS,
      )
    }

    ipRegisterTimestamps.set(ip, now)

    return next.handle()
  }
}