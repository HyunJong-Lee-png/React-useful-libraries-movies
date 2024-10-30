import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IFieldValues {
  firstName: string
  lastName: string
  email: string
  password1: string
  password2: string
  extraError?: string
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
`;

export default function ToDoList() {
  const { register, handleSubmit, formState: { errors }, setError, setValue, reset } = useForm<IFieldValues>({
    defaultValues: {
      email: '@naver.com'
    }
  });


  const onValid = (data: IFieldValues) => {
    if (data.password1 !== data.password2) {
      setError('password2', {
        message: 'password must be same'
      }, {
        shouldFocus: true
      });
      setValue('password2', '');
      return;
    }
    reset();
    //서버와 통신중 에러가 뜬 경우
    setError('extraError', {
      message: 'server down'
    })
  }

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register('firstName', {
          required: {
            value: true,
            message: 'firstName is required!'
          }
        })} placeholder="firstName" />
      {errors.firstName?.message}
      <input
        {...register('lastName', {
          required: 'lastName is required!'
        })} placeholder="lastName" />
      {errors.lastName?.message}
      <input
        {...register('email', {
          required: 'email is required!',
          pattern: {
            value: /^[a-zA-Z0-9_%+-]+@naver.com$/,
            message: 'pattern must be end with @naver.com'
          },
          validate: (value) => value.includes('nico') ? 'No nico' : true
        })} placeholder="email" />
      {errors.email?.message}
      <input
        {...register('password1', {

          required: 'password is required!',
          minLength: {
            value: 5,
            message: 'password is too short'
          }
        })} placeholder="password" />
      {errors.password1?.message}
      <input
        {...register('password2', {
          required: 'password is required!'
        })} placeholder="cofirm password" />
      {errors.password2?.message}
      {errors.extraError?.message}
      <button>submit</button>
    </Form>
  );
}