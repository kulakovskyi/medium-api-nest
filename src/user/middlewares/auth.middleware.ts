import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { ExpressRequestInterface } from '../../types/express-request.interface';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: () => void) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedUser = jwt.verify(token, JWT_SECRET);
      req.user = await this.userService.findByID(decodedUser.id);
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
