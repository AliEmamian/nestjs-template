import { Module,forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { PostModule } from '../post/post.module';
import { TagModule } from '@modules/tag2/tag.module';

@Module({
    imports: [forwardRef(()=>TagModule),forwardRef(()=>PostModule),
     
        JwtModule.register({
            privateKey: fs.readFileSync(path.join(process.cwd(), 'private.key'), 'utf8'), // مسیر کلید خصوصی از ریشه پروژه
            publicKey: fs.readFileSync(path.join(process.cwd(), 'public.key'), 'utf8'),   // مسیر کلید عمومی از ریشه پروژه
            signOptions: { expiresIn: '3600000s', algorithm: 'RS256' },
            verifyOptions: { algorithms: ['RS256'] },
        }),
    ],
    providers: [],
    controllers: [],
    exports:[JwtModule]
})
export class AuthModule { }