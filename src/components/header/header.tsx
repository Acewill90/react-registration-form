import Image from 'next/image';

import * as headerImage from '../../assets/img/forge.svg';

export const Header = () => {
  return (
    <header>
      <Image priority alt="header-image" src={headerImage} />
    </header>
  );
};
