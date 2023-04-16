import type { NextPage } from 'next';

import { Header } from 'components/header/header';
import { RegisterForm } from 'components/registerForm/registerForm';
import { SignInText } from 'components/signInText/signInText';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <RegisterForm />
      <SignInText />
    </>
  );
};

export default HomePage;
