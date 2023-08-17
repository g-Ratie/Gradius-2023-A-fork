import { enemyRepository } from '$/Repository/enemyRepository';
import type { EnemyId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';

import { EnemyIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';
import { position } from './playerUsecase';

//敵の位置を取得する際にこれを使えば、全ての敵の情報が配列で返されます
//repositoryからgetEnemiesを直接たたくとusecaseがなぜか更新されないため1時的な回避策としてusecaseをapiでたたいて認識させてます
export const enemyUsecase = {
  getAllEnemies: async (): Promise<EnemyModel[]> => {
    return await enemyRepository.getEnemies();
  },
  deleteEnemy: async (id: EnemyId) => {
    try {
      await enemyRepository.declare(id);
    } catch (e) {
      console.log(e);
    }
  },
};

// 仮初期値
export const enemyInfo = {
  enemyFirstPos_x: 100,
  enemySpeed: 5,
  enemyRadius: 20,
  enemyHp: 10,
  makeEnemyFrequency: 5000,
  enemySize: { h: 30, w: 30 },
};

setInterval(() => {
  create_enemy();
  deleteOffScreenEnemy();
}, enemyInfo.makeEnemyFrequency);

setInterval(() => {
  // move_or_delete_enemy();
  moveEnemy();
}, 10);

const create_enemy = async () => {
  const newEnemy: EnemyModel = {
    id: EnemyIdParser.parse(randomUUID()),
    pos: { x: enemyInfo.enemyFirstPos_x, y: Math.floor(Math.random() * 690) + 1 },
    speed: enemyInfo.enemyHp,
    hp: enemyInfo.enemyHp,
    radius: enemyInfo.enemyRadius,
    type: 2,
    ///1-3のランダムな数値を返す
    /* type: Math.floor(Math.random() * 3) + 1, */
  };
  await enemyRepository.save(newEnemy);
};
/* const moveToplayer = (enemy: EnemyModel, player: playerModel, delay: number) => {
  enemy.pos.x = (player.pos.x + delay * enemy.pos.x) / (delay + 1);
  enemy.pos.y = (player.pos.y + delay * enemy.pos.y) / (delay + 1);
  return { x: enemy.pos.x - enemy.speed, y: enemy.pos.y };
}; */
//y軸のみプレイヤーに追従する
//delayは追従の遅れを表す
const moveToPlayer = (enemy: EnemyModel, player: number[][], delay: number) => {
  enemy.pos.x = enemy.pos.x - enemy.speed;
  enemy.pos.y = (player[0][1] + delay * enemy.pos.y) / (delay + 1);
  return { x: enemy.pos.x, y: enemy.pos.y };
};

//typeによって動きを変える
const moveEnemyByPlayer = (enemy: EnemyModel): { x: number; y: number } => {
  if (enemy.type === 1) {
    return { x: enemy.pos.x - enemy.speed, y: enemy.pos.y };
  } else if (enemy.type === 2) {
    moveToPlayer(enemy, position, 60);
    /* return { x: enemy.pos.x - 30, y: enemy.pos.y }; */
  } else if (enemy.type === 3) {
    moveToPlayer(enemy, position, 30);
    /*  return { x: enemy.pos.x - 100, y: enemy.pos.y }; */
  }
  return { x: enemy.pos.x, y: enemy.pos.y };
};
//敵を動かす
const moveEnemy = async () => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();

  for (const enemy of enemies) {
    const newPos = moveEnemyByPlayer(enemy);
    const moved_enemy: EnemyModel = {
      ...enemy,
      pos: newPos,
    };

    await enemyRepository.save(moved_enemy);
  }
};
//一致する敵が存在するかどうか
const enemyExist = async (id: EnemyId): Promise<boolean> => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();
  return enemies.some((enemy) => enemy.id === id);
};
//敵を削除する
const deleteEnemy = async (id: EnemyId) => {
  if (await enemyExist(id)) {
    await enemyRepository.declare(id);
  }
};
//
const deleteOffScreenEnemy = async () => {
  const enemies: EnemyModel[] = await enemyRepository.getEnemies();

  const offScreenEnemiesIds = enemies.filter((enemy) => enemy.pos.x < 50).map((enemy) => enemy.id);

  for (const id of offScreenEnemiesIds) {
    console.log('画面外delete', id);
    await deleteEnemy(id);
  }
};

//await Promise.allは、必要か微妙
//await Promise.all(enemies.map((enemy) => enemyRepository.save(enemy)));
// enemies.map((enemy) => enemyRepository.save(enemy));
