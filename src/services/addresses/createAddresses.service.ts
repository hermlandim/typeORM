import { IAddressRequest } from "../../interfaces/addresses.interface";
import { User } from "../../entities/user.entity";
import Address from "../../entities/adress.entity";
import AppDataSource from "../../data-source";

const createAddressesService = async (
  addressData: IAddressRequest,
  userId: number
): Promise<Address> => {
  const userRepository = AppDataSource.getRepository(User);

  const addressRepository = AppDataSource.getRepository(Address);

  const newAddress = addressRepository.create(addressData);

  await addressRepository.save(newAddress);

  await userRepository.update(
    {
      id: userId,
    },
    {
      adress: newAddress,
    }
  );

  return newAddress;
};

export { createAddressesService };
