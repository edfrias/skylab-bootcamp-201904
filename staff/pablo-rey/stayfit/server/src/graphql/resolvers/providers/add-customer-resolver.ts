import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { ValidationError } from '../../../common/errors';
import { MyContext } from '../../../common/types/MyContext';
import { Provider, ProviderModel } from '../../../models/provider';
import { UserModel } from '../../../models/user';
import { ONLY_ADMINS_OF_PROVIDER } from './../../middleware/authChecker';

@Resolver(Provider)
export class AddProviderCustomerResolver {
  @Authorized(ONLY_ADMINS_OF_PROVIDER)
  @Mutation(returns => Boolean)
  async addProviderCustomer(
    @Arg('providerId') providerId: string,
    @Arg('userId') userId: string,
    @Ctx() ctx: MyContext
  ) {
    const newUser = await UserModel.findById(userId);
    if (!newUser) throw new ValidationError('newUser is required');

    const provider = await ProviderModel.findById(providerId);
    if (!provider!.isCustomer(newUser)) provider!.customers.push(newUser);
    await provider!.save();
    return true;
  }
}
