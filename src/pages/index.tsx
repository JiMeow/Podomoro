import CountdownCircleTimerComponent from "@/components/CountdownCircleTimer";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const time = 30;
  const [remainingTime, setRemainingTime] = useState<number>(time);
  const [tomatoes, setTomatoes] = useState<number>(0);
  const [playCount, setPlayCount] = useState<number>(0);

  useEffect(() => {
    const nowTomatoes = localStorage.getItem("tomatoes");
    setTomatoes(nowTomatoes ? parseInt(nowTomatoes) : 0);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remainingTime === 0) return;
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingTime]);

  const collectReward = () => {
    setPlayCount((prev) => prev + 1);
    setRemainingTime(time);
    setTomatoes((prev) => prev + 1);
    const nowTomatoes = localStorage.getItem("tomatoes");
    const tomatoes = nowTomatoes ? parseInt(nowTomatoes) : 0;
    localStorage.setItem("tomatoes", (tomatoes + 1).toString());
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.ico" />
        <link rel="apple-touch-icon" href="/icon.ico"></link>
        <meta property="og:image" content="/icon.ico" />
      </Head>
      <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 border-2 border-black bg-[#FFCF96] text-[#FF8080]">
        <Image
          src="/setting.png"
          width={48}
          height={48}
          alt="settings"
          className="absolute right-4 top-4"
        />
        <div className="flex w-full flex-col items-center">
          <h1 className="text-center text-4xl font-bold drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
            Pomodoro Timer
          </h1>
          {remainingTime > 0 ? (
            <p className="mt-4 w-fit rounded-md border-2 border-black px-6 py-1 text-center text-2xl drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
              {Math.floor(remainingTime / 60)}:
              {remainingTime % 60 < 10
                ? `0${remainingTime % 60}`
                : remainingTime % 60}
            </p>
          ) : (
            <button
              className="mt-4 w-fit rounded-md border-2 border-black px-4 py-1 text-center text-2xl font-bold text-[#ff7474] drop-shadow-[1px_1px_rgba(0,0,0,0.8)]
            transition-all duration-300 ease-in-out hover:bg-[#ff7474] hover:text-white active:scale-95"
              onClick={collectReward}
            >
              Collect your reward! 🎉
            </button>
          )}
        </div>
        <CountdownCircleTimerComponent key={playCount} duration={time} />
        {tomatoes !== 0 && (
          <div className="flex w-[66vw] flex-wrap items-center justify-center">
            <b className="mr-2 text-center text-2xl drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
              Collected:{" "}
            </b>
            {[...Array(tomatoes).keys()].map((_, index) => (
              <Image
                key={index}
                src="/icon.png"
                width={32}
                height={32}
                alt="tomatoes"
                className="object-contain"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
