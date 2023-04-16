import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import { Input } from 'components/input/input';

export const RegisterForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false,
    },
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
    succesfulSubmit: false,
  });

  const defineErrorMessages = (errors: any) => {
    setErrorMessages(prevState => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: errors?.name?.message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: errors?.email?.message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      password: errors?.password?.message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      terms: errors?.terms?.message,
    }));
  };

  const setSuccesfulSubmit = (bool: boolean) => {
    setErrorMessages(prevState => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      succesfulSubmit: bool,
    }));
  };

  const formSubmit = (data: FieldValues) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    void fetch('api/registration', requestOptions)
      .then(async response => response.json())
      .then(res => {
        // console.log(res);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        defineErrorMessages(res.errors);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (res.message === 'Successful registration') {
          setSuccesfulSubmit(true);

          setTimeout(() => {
            setSuccesfulSubmit(false);
            reset();
          }, 3000);
        }
      });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-console
    <form onSubmit={handleSubmit(data => formSubmit(data))}>
      <h1>Get started in minutes</h1>
      <p className="form-text">
        First, let&apos;s create your account. Once your account has been created you can choose the
        billing plan that is right for you and link your account with a server provider.
      </p>
      <fieldset>
        <Input errorMessage={errorMessages.name} id="name" label="Name" register={register} />
        <Input
          errorMessage={errorMessages.email}
          id="email"
          label="E-mail"
          register={register}
          type="email"
        />
        <Input
          errorMessage={errorMessages.password}
          id="password"
          label="Password"
          register={register}
          type="password"
        />
        <Input id="confirm_password" label="Confirm Password" register={register} type="password" />

        <div className="checkbox-wrapper">
          <input {...register('terms')} id="terms" type="checkbox" />
          <span className="checkmark" />
          <label htmlFor="terms">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}I agree to the{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </label>
        </div>
        {errorMessages.terms && <small>{errorMessages.terms}</small>}

        {errorMessages.succesfulSubmit && (
          <div className="success-message">Sikeresen regisztrált</div>
        )}
      </fieldset>

      <button className="button" type="submit">
        Register
      </button>
    </form>
  );
};
