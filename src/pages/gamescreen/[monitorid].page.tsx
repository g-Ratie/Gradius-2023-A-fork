import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import App from 'src/konva/konva';

const Home = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const { monitorid } = router.query;
  const monitoridNumber = Number(monitorid);
  if (typeof monitorid !== 'string') return <Loading visible />;

  return (
    <>
      {/* <div className={styles.container}>
        {/* 下記は簡易的に作ったモノです。削除してもらってかまいません */}
      {/* <h1 className={styles.word}>ここはgamescreenです</h1> */}
      <App monitorId={monitoridNumber} />
      <p>{monitorid}</p>
      {/* </div> */}
    </>
  );
};

export default Home;
