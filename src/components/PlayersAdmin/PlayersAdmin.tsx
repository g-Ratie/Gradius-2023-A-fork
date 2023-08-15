import type { PlayerModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './PlayersAdmin.module.css';

const PlayersAdmin = () => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await apiClient.rooms.control.$get();
      setPlayers(players);
    };
    fetchPlayers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>プレイヤー管理</h1>
      <ul>
        {players.map((player) => (
          <li key={player.userId}>
            <details>
              <summary>{player.name}</summary>
              <p>ユーザーID:{player.userId}</p>
              <p>スコア:{player.score}</p>
            </details>
            <button
              onClick={async () => {
                if (window.confirm('本当にこのプレイヤーを削除しますか？')) {
                  await apiClient.rooms.control.$delete({
                    body: { userId: player.userId },
                  });
                  const players = await apiClient.rooms.control.$get();
                  setPlayers(players);
                }
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersAdmin;
