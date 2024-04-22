import { Module,forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@shared/utils/constant';


@Module({
    imports: [forwardRef(()=>UserModule),
     
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600000s' },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports:[JwtModule]
})
export class AuthModule { }