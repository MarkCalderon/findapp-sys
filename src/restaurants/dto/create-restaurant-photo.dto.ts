import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateRestaurantPhotoDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsNumber()
  fileSize: number;

  @IsNumber()
  photoTypeId: number;
}
