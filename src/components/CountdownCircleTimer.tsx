import Image from "next/image";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type CountdownCircleTimerProps = {
  duration: number;
};

const CountdownCircleTimerComponent = ({
  duration,
}: CountdownCircleTimerProps) => {
  return (
    <CountdownCircleTimer
      size={300}
      strokeWidth={30}
      duration={duration}
      colors={["#ff8635", "#FF8080"]}
      colorsTime={[duration, 0]}
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
  );
};

export default CountdownCircleTimerComponent;
