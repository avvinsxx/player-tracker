import clsx from "clsx";
import Image from "next/image";

interface ChampionMasteryProps {
  label: string;
  image: string;
  stat: number;
  place: 1 | 2 | 3;
}

function ChampionMastery({ image, stat, place, label }: ChampionMasteryProps) {
  let imageSize = 100;
  if (place === 2) imageSize = 90;
  if (place === 3) imageSize = 85;
  return (
    <div className="relative">
      <Image
        src={image}
        width={imageSize}
        height={imageSize}
        className={clsx("my-auto rounded-full border-4", {
          "border-yellow-500": place === 1,
          "border-gray-400": place === 2,
          "border-yellow-800": place === 3,
        })}
        alt={label}
      />
      <div className="mt-3 text-center">{label}</div>
      <div
        className={clsx(
          "absolute left-[50%] w-[28px] translate-x-[-50%] rounded-full py-[2px] text-center",
          {
            "top-[84px] bg-yellow-500": place === 1,
            "top-[75px] bg-gray-400": place === 2,
            "top-[65px] bg-yellow-800": place === 3,
          },
        )}
      >
        {stat}
      </div>
    </div>
  );
}

export default ChampionMastery;
