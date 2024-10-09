export type MatchDto = {
  match_id: number;
  game_mode: number;
  players: {
    account_id: number;
    hero_id: number;
    level: number;
    item_0: number;
    item_1: number;
    item_2: number;
    item_3: number;
    item_4: number;
    item_5: number;
    backpack_0: number;
    backpack_1: number;
    backpack_2: number;
    item_neutral: number;
    win: number;
    kda: number;
    kills: number;
    deaths: number;
    assists: number;
    start_time: number;
    duration: number;
    game_mode: number;
  }[];
};
