export class CreateRestaurantDto {
  name: string;
  address?: string;
  cuisine?: string;
  description?: string;
  priceRange?: number;
  phoneNumber?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
}
