"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { AppDispatch } from "@/redux/store";
import Button from "@/components/Button";
import { signin } from "@/redux/features/auth-slice";

type Form = {
  username: string;
  password: string;
};

export default function Page() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const clickLoginButton = async (data: Form) => {
    setLoading(true);

    await dispatch(signin(data))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          router.push("/dashboard");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      className="flex flex-col gap-2 rounded-xl border border-gray-50 bg-gray-50 p-4"
      onSubmit={handleSubmit(clickLoginButton)}
    >
      <input
        {...register("username", {
          required: {
            value: true,
            message: "이메일을 입력해주세요",
          },
        })}
        className="rounded border border-gray-600 p-2 text-sm focus:outline-black"
        type="text"
        placeholder="username"
      />

      {errors.username && (
        <p className="text-sm text-red-400">{errors.username.message}</p>
      )}

      <input
        {...register("password", {
          required: {
            value: true,
            message: "비밀번호를 입력해주세요",
          },
        })}
        className="rounded border border-gray-600 p-2 text-sm focus:outline-black"
        type="password"
        placeholder="password"
      />

      {errors.password && (
        <p className="text-sm text-red-400">{errors.password.message}</p>
      )}

      <Button
        disabled={!isValid || isLoading}
        label="로그인"
        size="sm"
        type="submit"
        variant="fulfilled"
        isLoading={isLoading}
      />
    </form>
  );
}
