import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { UserId } from './../../commonTypesWithClient/branded';
export type Methods = {
  post: {
    reqBody: {
      userId: UserId;
    };
    resBody: PlayerModel;
  };
};
