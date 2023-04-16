import type { FC, HTMLInputTypeAttribute } from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  label,
  id,
  register,
  value,
  errorMessage,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...register(id)} id={id} type={type} value={value} />
      {errorMessage && <small>{errorMessage}</small>}
    </>
  );
};
