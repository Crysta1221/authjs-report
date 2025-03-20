"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, AlertTriangle, LockIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { SigninImage } from "./signin_image";

export function ErrorForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [isLoading, setIsLoading] = useState({
    retry: false,
    signOut: false,
  });

  // エラーメッセージの決定
  const getErrorMessage = () => {
    switch (error) {
      case "AccessDenied":
        return "サーバーに参加されていないようです。参加して再度お試しください。";
      case "Configuration":
        return "サーバーに問題が発生しています。運営にお問い合わせください。";
      case "OAuthCallbackError":
        return "正しくリダイレクトされませんでした。再度お試しください。";
      case "Default":
        return "予期しないエラーが発生しました。再度お試しください。";
      default:
        return "ログイン中にエラーが発生しました。再度お試しください。";
    }
  };

  const handleRetry = async () => {
    setIsLoading({ ...isLoading, retry: true });
    router.push("/signin");
  };

  const handleSignOut = async () => {
    setIsLoading({ ...isLoading, signOut: true });
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return (
    <div className='h-screen lg:flex'>
      <SigninImage />
      <div className='flex flex-col h-screen lg:w-5/12 xl:w-4/12 justify-center items-center bg-white relative'>
        <motion.div
          className='absolute flex flex-col justify-center items-center'
          style={{ top: "10%", width: "100%" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <div className='bg-green-600 rounded-full size-16 flex items-center justify-center'>
            <LockIcon size={32} color='white' />
          </div>

          <div className='flex flex-col items-center w-full'>
            <p className='text-black text-2xl mt-4'>ログイン</p>

            <motion.div
              className='w-full flex justify-center items-center mt-4 mr-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}>
              <div className='flex justify-between items-center mb-8 max-w-xs w-full'>
                <div className='flex flex-col items-center mt-4'>
                  <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-1'>
                    <Check size={16} />
                  </div>
                  <span className='text-xs text-gray-500'>ログイン</span>
                </div>
                <div className='h-0.5 flex-1 bg-green-600 mx-2'>
                  <div className='h-full w-full bg-green-600'></div>
                </div>
                <div className='flex flex-col items-center mt-4'>
                  <div className='w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mb-1'>
                    <AlertTriangle size={16} />
                  </div>
                  <span className='text-xs text-gray-500'>検証</span>
                </div>
                <div className='h-0.5 flex-1 bg-gray-300 mx-2'></div>
                <div className='flex flex-col items-center mt-4'>
                  <div className='w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center mb-1'>
                    3
                  </div>
                  <span className='text-xs text-gray-500'>確認</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='mt-16 flex flex-col items-center justify-center p-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <div className='flex items-center justify-center mb-4'>
            <AlertTriangle size={24} className='text-red-500 mr-2' />
            <h2 className='text-xl font-semibold text-red-500'>
              ログインエラー
            </h2>
          </div>
          <p className='text-gray-600 text-center'>
            次のエラーによりログインできませんでした:
          </p>
          <p className='text-gray-600 mb-6 text-center'>{getErrorMessage()}</p>

          <div className='w-full'>
            <div className='flex gap-4'>
              <Button
                className='w-full border border-black'
                onClick={handleSignOut}
                disabled={isLoading.signOut || isLoading.retry}>
                {isLoading.signOut ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                キャンセル
              </Button>

              <Button
                className='w-full bg-green-600 hover:bg-green-700 text-white'
                onClick={handleRetry}
                disabled={isLoading.retry || isLoading.signOut}>
                {isLoading.retry ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                再試行
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
