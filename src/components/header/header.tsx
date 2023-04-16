import Image from 'next/image';

import headerImage from '../../assets/img/forge.svg';

export const Header = () => {
  return (
    <header>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Image alt="header-image" src={headerImage} />
    </header>
  );
};
