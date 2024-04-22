import { Module ,forwardRef} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { UserRepository } from './user.repository';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [
    forwardRef(()=>AuthModule),
  ],
  exports: [UserService, UserRepository],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
  ],
})
export class UserModule {}
