import clsx from "clsx";
import Image from "next/image";

interface FavCharacterProps {
  name: string;
  image: string;
  games: number;
  win: number;
  place: 1 | 2 | 3;
}

function FavCharacter({ name, image, games, win, place }: FavCharacterProps) {
  return (
    <div
      className={clsx("border-4", {
        "border-yellow-500": place === 1,
        "border-gray-400": place === 2,
        "border-yellow-800": place === 3,
      })}
    >
      <Image
        src={image}
        className="w-full"
        width={110}
        height={40}
        alt={`Character ${name}`}
      />
      <h3
        className={clsx("p-1 text-center", {
          "bg-yellow-500": place === 1,
          "bg-gray-400": place === 2,
          "bg-yellow-800": place === 3,
        })}
      >
        {name}
      </h3>
      <div className="p-2">
        <p>Games: {games}</p>
        {win > 0 && <p>WR: {((win / games) * 100).toFixed(0) + "%"}</p>}
      </div>
    </div>
  );
}

export default FavCharacter;
