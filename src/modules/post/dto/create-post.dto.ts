import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { filter, name } from '@entities/post.entity';

enum typeEnum {
    Article = 'article',
    Blog = 'blog',
    ProductReview = 'productReview'
}

export class CreatePostDto {
    @IsEnum(typeEnum)
    public type: typeEnum;

    @IsOptional()
    public title: name;

    @IsOptional()
    public description: name;

    @IsOptional()
    public tags: string[];

    @IsOptional()
    public filter: filter;

    @IsOptional()
    public image: string;

    @IsOptional()
    public media: any;
}
