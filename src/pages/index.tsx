import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Home() {
  const [remainingTime, setRemainingTime] = useState(10);
  const [tomatoes, setTomatoes] = useState<number>(0);

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
    setRemainingTime(1500);
    const nowTomatoes = localStorage.getItem("tomatoes");
    const tomatoes = nowTomatoes ? parseInt(nowTomatoes) : 0;
    localStorage.setItem("tomatoes", (tomatoes + 1).toString());
    setTomatoes((prev) => prev + 1);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.ico" />
        <link rel="apple-touch-icon" href="/icon.ico"></link>
        <meta property="og:image" content="/icon.ico" />
      </Head>
      <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center gap-8 border-2 border-black bg-[#FFCF96] text-[#FF8080]">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-center text-4xl font-bold drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
            Pomodoro Timer
          </h1>
          {remainingTime > 0 ? (
            <p className="mt-2 w-fit rounded-md border-2 border-black px-6 text-center text-2xl drop-shadow-[1px_1px_rgba(0,0,0,0.8)]">
              {Math.floor(remainingTime / 60)}:
              {remainingTime % 60 < 10
                ? `0${remainingTime % 60}`
                : remainingTime % 60}
            </p>
          ) : (
            <button
              className="mt-4 w-fit rounded-md border-2 border-black px-4 py-1 text-center text-xl font-bold text-[#ff7474] drop-shadow-[1px_1px_rgba(0,0,0,0.8)]
            transition-all duration-300 ease-in-out hover:bg-[#ff7474] hover:text-white active:scale-95"
              onClick={collectReward}
            >
              Collect your reward! 🎉
            </button>
          )}
        </div>
        <CountdownCircleTimer
          size={300}
          strokeWidth={30}
          duration={1500}
          colors={["#FF8080", "#ff8635", "#ffb17d"]}
          colorsTime={[7, 3, 0]}
          isSmoothColorTransition
          isGrowing
          isPlaying
          trailColor="#F6FDC3"
        >
          {() => (
            <div className="flex items-center justify-center">
              <Image
                src="/tomato.png"
                alt="tomatoes"
                width={360}
                height={360}
                className="h-[66%] w-[66%] object-contain"
              />
            </div>
          )}
        </CountdownCircleTimer>
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
              ></Image>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
