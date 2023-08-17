/* eslint-disable max-nested-callbacks */
import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage, Text } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import useImage from 'use-image';
import Boom from './Boom';

const Game = ({ monitorId }: { monitorId: number }) => {
  const windowWidth = Number(window.innerWidth);
  const windowHeight = Number(window.innerHeight);

  //プレイヤーと弾敵をstateで管理
  const [newPlayerPosition, setNewPlayerPosition] = useState<PlayerModel[]>([]);
  const [newGunPosition, setNewGunPosition] = useState<number[][]>([]);
  const [newEnemyPosition, setNewEnemyPosition] = useState<EnemyModel[]>([]);
  const [newBoomPosition, setNewBoomPosition] = useState<number[][]>([]);

  const [shipImage] = useImage(staticPath.player_png);
  const [enemyimage1_1] = useImage(staticPath.enemy3_png);
  const [enemyimage1_2] = useImage(staticPath.enemy4_png);
  const enemy1ImageRef = useRef(enemyimage1_1);
  const [bulletImage] = useImage(staticPath.bullet_png);

  //apiを叩いてプレイヤーと銃敵の位置を取得stateにセット
  const getPosition = useCallback(async () => {
    const checkCollision = (hitlist1: EnemyModel[], hitlist2: number[][]) => {
      const list2Radius = 15; // list2 の固定の半径

      hitlist1.map((list1) => {
        hitlist2.map((list2: number[]) => {
          const distance1to2 = Math.sqrt(
            (list1.pos.x - list2[0]) ** 2 + (list1.pos.y - list2[1]) ** 2
          );
          if (distance1to2 < list1.radius + list2Radius) {
            apiClient.check.$post({ body: list1.id });
            apiClient.rooms.score.$post();
            const makeBoomPosition = [...newBoomPosition, [list1.pos.x - 20, list1.pos.y - 50]];
            setNewBoomPosition(makeBoomPosition);
            const newBullets = newGunPosition.filter((bullet) => {
              return bullet[0] !== list2[0] && bullet[1] !== list2[1];
            });
            setNewGunPosition(newBullets);
            console.log('フロントhit', list1.id);
            console.log('フロントhit', makeBoomPosition);
            return;
          }
        });
      });
    };
    const new_playerPosition = await apiClient.rooms.control.$get();
    const new_gunPosition = await apiClient.rooms.gunPosition.$get();
    const new_enemyPosition = await apiClient.check.$get();

    ///当たり判定を行う
    checkCollision(new_enemyPosition, new_gunPosition);

    setNewPlayerPosition(new_playerPosition);
    setNewGunPosition(new_gunPosition);
    setNewEnemyPosition(new_enemyPosition);
  }, [newBoomPosition, newGunPosition]);

  //仮の当たり判定関数

  //apiを叩く処理を100msごとに実行
  useEffect(() => {
    const enemyAnim = () => {
      if (enemy1ImageRef.current === enemyimage1_1) {
        enemy1ImageRef.current = enemyimage1_2;
      } else {
        enemy1ImageRef.current = enemyimage1_1;
      }
    };
    const resetBoom = () => {
      setNewBoomPosition([]);
    };

    const cancelId = setInterval(getPosition, 20);
    const cancelId2 = setInterval(enemyAnim, 500);
    //秒数管理ではなく、出現後何秒で消えるかを管理したい
    const cancelId3 = setInterval(resetBoom, 10100);
    return () => {
      clearInterval(cancelId);
      clearInterval(cancelId2);
      clearInterval(cancelId3);
    };
  }, [enemyimage1_1, enemyimage1_2, getPosition]);
  //mapで展開してひとつずつ描画
  return (
    <Stage width={windowWidth} height={windowHeight} style={{ border: '1px solid black' }}>
      <Layer>
        <Rect
          stroke={'black'}
          strokeWidth={1}
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
        />

        {newPlayerPosition.map((player, index) => (
          <>
            <Image
              image={shipImage}
              key={index}
              x={player.pos.x - monitorId * windowWidth}
              y={player.pos.y}
              width={50}
              height={50}
            />
            <Text
              x={player.pos.x - monitorId * windowWidth - 23}
              y={player.pos.y - 45}
              fontSize={15}
              fontFamily="Arial"
              fill="black"
              text={player.name}
            />
          </>
        ))}
        {newGunPosition.map((gun, index) => (
          <Image
            image={bulletImage}
            key={index}
            radius={15}
            x={gun[0] - monitorId * windowWidth}
            y={gun[1]}
            rotationDeg={-90}
          />
        ))}
        {newEnemyPosition.map((enemy, index) => (
          <React.Fragment key={index}>
            <Image
              image={enemy1ImageRef.current}
              key={index}
              x={enemy.pos.x - monitorId * windowWidth}
              y={enemy.pos.y}
              width={50}
              height={50}
              rotationDeg={-90}
            />
            <Text
              x={enemy.pos.x - monitorId * windowWidth}
              y={enemy.pos.y}
              fontSize={15}
              fontFamily="Arial"
              cc
              text={enemy.type.toString()}
            />
          </React.Fragment>
        ))}
        {newBoomPosition.map((boom, index) => (
          <React.Fragment key={index}>
            <Boom boom={boom} index={index} />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default Game;
