"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2, LockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SigninImage } from "./signin_image";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animationStage, setAnimationStage] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStage(1);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  async function handleDiscordLogin() {
    try {
      setIsLoading(true);
      await signIn("discord", { callbackUrl: "/signin" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className='h-screen lg:flex'>
      <SigninImage />
      <div className='flex flex-col h-screen lg:w-5/12 xl:w-4/12 justify-center items-center bg-white relative'>
        <div
          className='absolute flex flex-col justify-center items-center'
          style={{
            top: animationStage === 0 ? "calc(50% - 2rem)" : "10%",
            transition:
              animationStage === 1 ? "top 0.6s ease-in-out 0.2s" : "none",
            width: animationStage === 1 ? "100%" : "auto",
          }}>
          <div className='bg-green-700 rounded-full size-16 flex items-center justify-center'>
            <motion.div
              animate={{
                x: animationStage === 0 ? [0, -5, 5, -3, 3, 0] : 0,
              }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
              }}>
              <LockIcon size={32} />
            </motion.div>
          </div>
          <AnimatePresence>
            {animationStage === 1 && (
              <motion.div
                className='flex flex-col items-center w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}>
                <p className='text-black text-2xl mt-4'>ログイン</p>

                <motion.div
                  className='w-full flex justify-center items-center mt-4 mr-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}>
                  <div className='flex justify-between items-center mb-8 max-w-xs w-full'>
                    <div className='flex flex-col items-center mt-4'>
                      <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-1'>
                        1
                      </div>
                      <span className='text-xs text-gray-500'>ログイン</span>
                    </div>
                    <div className='h-0.5 flex-1 bg-gray-300 mx-2'>
                      <div className='h-full w-0 bg-green-600'></div>
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                      <div className='w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mb-1'>
                        2
                      </div>
                      <span className='text-xs text-gray-500'>検証</span>
                    </div>
                    <div className='h-0.5 flex-1 bg-gray-300 mx-2'></div>
                    <div className='flex flex-col items-center mt-4'>
                      <div className='w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mb-1'>
                        3
                      </div>
                      <span className='text-xs text-gray-500'>確認</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {animationStage === 1 && (
            <motion.div
              className='-mt-8 w-full max-w-sm p-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}>
              <div className='text-center mb-6'>
                <p className='text-gray-600'>ログイン方法を選択</p>
              </div>

              <Button
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white'
                onClick={handleDiscordLogin}
                disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-discord'
                    viewBox='0 0 16 16'>
                    <path d='M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612' />
                  </svg>
                )}
                Discordでログイン
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
