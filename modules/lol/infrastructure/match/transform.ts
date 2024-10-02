import { Match } from "../../domain/match/match";
import { MatchDto } from "./dto";

export function dtoToMatch(match: MatchDto): Match | null {
  if (!match?.metadata?.matchId) return null;
  return {
    id: match.metadata.matchId,
    gameMode: match.info.gameMode,
    startTimestamp: match.info.gameStartTimestamp,
    duration: match.info.gameDuration,
    participants: match.info.participants.map((participant) => ({
      puuid: participant.puuid,
      championId: participant.championId,
      level: participant.champLevel,
      deaths: participant.deaths,
      assists: participant.assists,
      kills: participant.kills,
      win: participant.win,
      items: [
        participant.item0,
        participant.item1,
        participant.item2,
        participant.item3,
        participant.item4,
        participant.item5,
      ],
      summonerSpells: [participant.summoner1Id, participant.summoner2Id],
    })),
  };
}
