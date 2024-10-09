import { cloneElement, ReactElement } from "react";

interface InputGroupProps {
  children: ReactElement[];
}

export function InputGroup({ children }: InputGroupProps) {
  return (
    <>
      {children.map((child, index) => {
        let className = "rounded-none";
        if (index === 0) {
          className += " rounded-l-md";
        } else if (index === children.length - 1) {
          className += " rounded-r-md";
        }
        if (index !== 0) {
          className += " border-l-0";
        }
        return cloneElement(child, { className });
      })}
    </>
  );
}
