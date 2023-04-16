import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';

import { Input } from 'components/input/input';

export const RegisterForm: FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setForm(state => ({ ...state, [event.target.name]: event.target.value }));
  }, []);

  const submit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log(form);
  }, [form]);

  return (
    <form>
      <h1>Get started in minutes</h1>
      <p>
        First, let&apos;s create your account. Once your account has been created you can choose the
        billing plan that is right for you and link your account with a server provider.
      </p>

      <label htmlFor="name">Name</label>
      <Input id="name" name="name" value={form.name} onChange={handleInputChange} />
      <label htmlFor="email">E-mail</label>
      <Input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} />
      <label htmlFor="password">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleInputChange}
      />
      <label htmlFor="confirm-password">Confirm Password</label>
      <Input
        id="confirm-password"
        name="passwordConfirm"
        type="password"
        value={form.passwordConfirm}
        onChange={handleInputChange}
      />
      <button className="button" type="button" onClick={submit}>
        Register
      </button>
    </form>
  );
};
