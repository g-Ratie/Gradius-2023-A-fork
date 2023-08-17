import { useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

const Boom = ({ boom, index }: { boom: number[]; index: number }) => {
  const [boomImage1] = useImage(staticPath.boom1_png);
  const [boomImage2] = useImage(staticPath.boom2_png);
  const [boomImage3] = useImage(staticPath.boom3_png);
  const [boomImage4] = useImage(staticPath.boom4_png);
  const [boomImage5] = useImage(staticPath.boom5_png);
  const [boomImage6] = useImage(staticPath.boom6_png);
  const boomImageRef = useRef(boomImage1);

  useEffect(() => {
    const boomImageList = [boomImage1, boomImage2, boomImage3, boomImage4, boomImage5, boomImage6];

    const updateBoomImage = () => {
      const currentIndex = boomImageList.indexOf(boomImageRef.current);
      if (currentIndex + 1 === boomImageList.length) {
        clearInterval(intervalId); // リストの終わりに達したらアニメーションを停止
        return;
      }
      const nextIndex = currentIndex + 1;
      boomImageRef.current = boomImageList[nextIndex];
    };

    const intervalId = setInterval(updateBoomImage, 75); // 500msごとに画像を更新

    return () => {
      clearInterval(intervalId); // コンポーネントのアンマウント時にタイマーをクリア
    };
  }, [boomImage1, boomImage2, boomImage3, boomImage4, boomImage5, boomImage6]);

  return (
    <Image
      image={boomImageRef.current}
      key={index}
      x={boom[0]}
      y={boom[1]}
      width={100}
      height={100}
    />
  );
};

export default Boom;
