'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';
import { url } from 'inspector';

export default function BirthdayWish() {
  type ConfettiProps = {
    width: number;
    height: number;
  };

  const DynamicConfetti = dynamic(() => import('react-confetti'), {
    ssr: false,
  });

  const candleColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  const confettiColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
  ];

  const [candleLit, setCandleLit] = useState<number>(0);
  const [baloonPoppedCount, setBaloonPoppedCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  });
  const totalCandles: number = 5;
  const totalBaloons: number = 5;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (candleLit === totalCandles && baloonPoppedCount === totalBaloons) {
      setShowConfetti(true);
    }
  }, [candleLit, baloonPoppedCount]);

  const lightCandles = (index: number) => {
    if (index === candleLit) {
      setCandleLit((prev) => prev + 1);
    }
  };

  const popBaloon = (index: number) => {
    if (index === baloonPoppedCount) {
      setBaloonPoppedCount((prev) => prev + 1);
    }
  };

  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    const interval = setInterval(() => {
      setCandleLit((prev) => {
        if (prev < totalCandles) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500);
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-4"
      style={{
        background: `url("/assets/img/tp206-instagramstory-26a.jpg") no-repeat center center/cover`,
        minHeight: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-black"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-black">
              Happy Birthday!
            </CardTitle>
            <CardDescription className="text-2xl font-semibold text-gray-600">
              Rimsha Arshad
            </CardDescription>
            <p className="text-lg text-gray-500">October 11th</p>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Light the candles:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candleLit) ||
                    (!celebrating && index < candleLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: celebrating ? index * 0.5 : 0,
                        }}
                      >
                        <FaBirthdayCake
                          className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          style={{
                            color: candleColors[index % candleColors.length],
                          }}
                          onClick={() => lightCandles(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                        onClick={() => lightCandles(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">
                Pop the balloons:
              </h3>
              <div className="flex justify-center space-x-2">
                {[...Array(totalBaloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < baloonPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className={`w-8 h-8 cursor-pointer hover:scale-110`}
                      style={{
                        color:
                          index < baloonPoppedCount
                            ? '#D1D5DB'
                            : balloonColors[index % balloonColors.length],
                      }}
                      onClick={() => popBaloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="bg-black text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  );
}
