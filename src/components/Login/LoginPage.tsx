/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, Form, Input, message, Spin } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import { useEffect, useState } from "react";

import { Error_model_hook } from "@/utils/modalHook";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hooks";

const LoginComponent = ({ redirectLink }: { redirectLink?: string }) => {
  const { data } = useAppSelector((state) => state.userInfo);
  const redirect = useSearchParams().get("redirectLink");
  const router = useRouter();
  const [userLogin, { error, isLoading }] = useUserLoginMutation();

  //!----------- Auto Redirect if logged in --------
  useEffect(() => {
    if (data?.id) {
      router.push("/");
    }
  }, [router, data?.id]);
  //------------------------------------------------

  //!----------- Submit Handler -----------
  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const res = await userLogin(values).unwrap();
      console.log("🚀 ~ onFinish ~ res:", res);

      if (res?.data?.accessToken) {
        message.success("User logged in successfully!");
        router.push(`/dashboard?ct=${res?.data?.accessToken}`);
        localStorage.setItem("accessToken", res?.data?.accessToken);
        if (redirect || redirectLink) {
          setTimeout(() => {
            router.push(redirect || redirectLink || `/`);
          }, 300);
        }
      } else {
        Error_model_hook(res?.message);
      }
    } catch (err: any) {
      Error_model_hook(err?.data || err?.message);
    }
  };

  return (
    <div className="">
      <div className="relative mt-3 flex items-center justify-center">
        <Image
          className="relative -top-24 -z-10"
          style={{ width: "100vw", height: "100vh" }}
          src={
            "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop"
          }
          width={700}
          height={700}
          alt=""
        />

        <div className="absolute inset-0 top-10 z-30 mx-auto flex w-full max-w-lg items-start px-6 pt-10 lg:w-3/6">
          <div className="flex-1 p-5 shadow-lg backdrop-blur-3xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <div className="text-center">
              <p className="mt-3 text-[1.5rem] text-primary">
                Log in to access your account
              </p>
            </div>

            <div className="mt-8">
              {/* ✅✅ Ant Design Form */}
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Your Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email is required!" },
                    { type: "email", message: "Enter a valid email!" },
                  ]}
                >
                  <Input size="large" placeholder="Type your email" />
                </Form.Item>

                <Form.Item
                  label="Your Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required!" }]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Type your password"
                  />
                </Form.Item>

                <Button
                  type="default"
                  style={{
                    width: "6rem",
                    fontWeight: "600",
                    backgroundColor: "blue",
                    height: "2.6rem",
                    color: "white",
                  }}
                  htmlType="submit"
                >
                  {isLoading ? "Loading..." : "Login"}
                </Button>
              </Form>

              <div className="mt-10">
                <p className="mt-6 text-center text-sm">
                  Don{"'"}t have an account{" "}
                  <Link
                    href="https://iblossomlearn-academy.org/login#signup"
                    className="ml-1 whitespace-nowrap font-semibold text-blue-600 hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
