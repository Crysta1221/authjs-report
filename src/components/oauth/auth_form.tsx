"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Check, LockIcon, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { SigninImage } from "./signin_image";

export function AuthForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    dashboard: false,
    signOut: false,
  });

  const handleDashboard = async () => {
    setIsLoading({ ...isLoading, dashboard: true });
    router.push("/dashboard");
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
          <div className='bg-green-700 rounded-full size-16 flex items-center justify-center'>
            <LockIcon size={32} />
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
                  <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-1'>
                    <Check size={16} />
                  </div>
                  <span className='text-xs text-gray-500'>検証</span>
                </div>
                <div className='h-0.5 flex-1 bg-green-600 mx-2'></div>
                <div className='flex flex-col items-center mt-4'>
                  <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-1'>
                    3
                  </div>
                  <span className='text-xs text-gray-500'>確認</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='mt-36 flex flex-col items-center justify-center p-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}>
          <Avatar className='size-28 border-2 border-green-700'>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>

          <h2 className='text-2xl mb-2 text-black mt-4'>
            {session?.user_full?.username}
            <span className='text-gray-400'>
              #{session?.user_full?.discriminator}
            </span>
          </h2>
          <p className='text-gray-600 mb-6 text-center'>
            このアカウントでログインしますか？
          </p>

          <div className='w-full'>
            <div className='flex gap-4'>
              <Button
                className='w-full border border-black'
                onClick={handleSignOut}
                disabled={isLoading.signOut || isLoading.dashboard}>
                {isLoading.signOut ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                キャンセル
              </Button>

              <Button
                className='w-full bg-green-600 hover:bg-green-700'
                onClick={handleDashboard}
                disabled={isLoading.dashboard || isLoading.signOut}>
                {isLoading.dashboard ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : null}
                ログイン
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
