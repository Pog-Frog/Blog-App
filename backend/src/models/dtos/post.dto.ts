import {IsString, IsNotEmpty, MinLength} from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    public title: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    public content: string | undefined;
}

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    public title: string | undefined;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    public content: string | undefined;
}

export class UpdatePostLikesDto {
    @IsNotEmpty()
    public likes: string | undefined;
}
