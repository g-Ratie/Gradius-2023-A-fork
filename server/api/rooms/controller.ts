import { playerRepository } from '$/Repository/playerRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: await playerRepository.read(body.userId),
  }),
}));
