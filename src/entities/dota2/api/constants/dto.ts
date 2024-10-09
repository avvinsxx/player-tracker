export interface HeroConstantsDto {
  [key: string]: { localized_name: string; img: string };
}

export interface ItemConstantsDto {
  [key: string]: { id: number; img: string };
}

export interface GameModeConstantsDto {
  [key: string]: { name: string };
}
