import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';

import { Input } from 'components/input/input';

import type { ErrorResponse } from './ErrorResponse';
import type { RegistrationApiResponse } from './RegistrationApiResponse';

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
    terms: '',
    succesfulSubmit: false,
  });

  const defineErrorMessages = (errors?: ErrorResponse) => {
    setErrorMessages(prevState => ({
      ...prevState,
      name: errors?.name?.message ?? '',
      email: errors?.email?.message ?? '',
      password: errors?.password?.message ?? '',
      terms: errors?.terms?.message ?? '',
    }));
  };

  const toggleSuccesfulSubmit = () => {
    setErrorMessages(prevState => ({
      ...prevState,
      succesfulSubmit: !prevState.succesfulSubmit,
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
      .then((res: RegistrationApiResponse) => {
        // console.log(res);
        defineErrorMessages(res.errors);

        if (res.message === 'Successful registration') {
          toggleSuccesfulSubmit();

          setTimeout(() => {
            toggleSuccesfulSubmit();
            reset();
          }, 3000);
        }
      });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
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

      <button className="button" disabled={errorMessages.succesfulSubmit} type="submit">
        Register
      </button>
    </form>
  );
};
