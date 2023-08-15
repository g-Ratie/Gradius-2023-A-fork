import { playerRepository } from '$/Repository/playerRepository';
import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await playerUsecase.getPlayerPos(),
  }),
  post: async ({ body: { moveDirection, userId } }) => ({
    status: 200,
    body: await playerUsecase.movePlayer(moveDirection, userId),
  }),
  delete: async ({ body: { userId } }) => ({
    status: 200,
    body: await playerRepository.declare(userId),
  }),
}));
