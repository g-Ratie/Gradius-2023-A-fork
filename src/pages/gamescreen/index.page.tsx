import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import App from 'src/konva/konva';

const Home = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      {/* <div className={styles.container}>
        {/* 下記は簡易的に作ったモノです。削除してもらってかまいません */}
      {/* <h1 className={styles.word}>ここはgamescreenです</h1> */}
      <App monitorId={0} />
      {/* </div> */}
    </>
  );
};

export default Home;
