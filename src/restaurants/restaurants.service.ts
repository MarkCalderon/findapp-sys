import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantPhotoDto } from './dto/create-restaurant-photo.dto';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  findOne(id: string) {
    return this.prisma.restaurant.findUnique({
      where: { id },
      include: {
        photos: {
          include: {
            photo: true,
          },
        },
      },
    });
  }

  addPhoto(
    restaurantId: string,
    createRestaurantPhotoDto: CreateRestaurantPhotoDto,
  ) {
    return this.prisma.restaurantPhoto.create({
      data: {
        restaurant: { connect: { id: restaurantId } },
        photo: {
          create: {
            url: createRestaurantPhotoDto.url,
            mimeType: createRestaurantPhotoDto.mimeType,
            fileSize: createRestaurantPhotoDto.fileSize,
            photoTypeId: createRestaurantPhotoDto.photoTypeId,
          },
        },
      },
      include: {
        photo: true,
      },
    });
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  remove(id: string) {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }
}
