"use client";

import { MdDoNotDisturb } from "react-icons/md";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

interface WinrateChartProps {
  wins: number;
  looses: number;
}

export function WinrateChart({ wins, looses }: WinrateChartProps) {
  const data = [
    { name: "Win", value: wins, color: "#5383e8" },
    { name: "Loose", value: looses, color: "#e84057" },
  ];
  const gameCount = wins + looses;
  return (
    <div className="flex h-[300px] flex-col rounded-md bg-neutral-700 p-4">
      <h2 className="text-center text-2xl">Win rate</h2>

      {gameCount === 0 ? (
        <div className="flex flex-grow-[1] flex-col items-center justify-center">
          <MdDoNotDisturb />
          <p>Matches not found</p>
        </div>
      ) : (
        <>
          <p className="text-center text-sm text-neutral-300">
            (last {gameCount} games)
          </p>
          <ResponsiveContainer width={400} height="90%" className="mx-auto">
            <PieChart width={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
              >
                <Label
                  value={`${((wins / (wins + looses)) * 100).toFixed(2)}%`}
                  position="center"
                  fill="#D4D4D4"
                />

                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="tranparent" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
