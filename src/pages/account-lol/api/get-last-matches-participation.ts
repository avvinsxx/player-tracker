import {
  getAccount,
  getChampionIconUrl,
  getChampionName,
  getItemIconUrl,
  getLast10MatchesId,
  getMatch,
  getSpellName,
  getSummonerSpellIconUrl,
} from "@/src/entities/lol";
import { ensure } from "@/src/shared/lib";
import { Match } from "../model/match";

interface GetLastMatchesParticipationInput {
  name: string;
  tag: string;
  platform: string;
}

const dependencies = {
  getAccount: getAccount,
  getLast10MatchesId: getLast10MatchesId,
  getMatch: getMatch,
  getChampionName: getChampionName,
  getSpellName: getSpellName,

  getChampionIconUrl: getChampionIconUrl,
  getItemIconUrl: getItemIconUrl,
  getSummonerSpellIconUrl: getSummonerSpellIconUrl,
};

export async function getLastMatchesParticipation(
  { name, tag, platform }: GetLastMatchesParticipationInput,
  {
    getAccount,
    getLast10MatchesId,
    getMatch,
    getChampionIconUrl,
    getItemIconUrl,
    getSummonerSpellIconUrl,
    getSpellName,
    getChampionName,
  }: typeof dependencies = dependencies,
) {
  const account = await getAccount(name, tag, platform);
  const matchesId = await getLast10MatchesId(account.id, platform);

  const fetchMatchPromises = [];

  for (const matchId of matchesId) {
    fetchMatchPromises.push(getMatch(matchId, platform));
  }

  const matches = await Promise.all(fetchMatchPromises);

  const matchParticipations: Match[] = [];
  for (const match of matches) {
    if (match == null) continue;
    const currentPlayer = ensure(
      match.participants.find(
        (participant) => participant.puuid === account.id,
      ),
    );

    matchParticipations.push({
      matchId: match.id,
      gameMode: match.gameMode,
      duration: match.duration,
      startTimestamp: match.startTimestamp,
      champion: {
        iconUrl: getChampionIconUrl(currentPlayer.championId),
        name: getChampionName(currentPlayer.championId),
      },
      level: currentPlayer.level,
      deaths: currentPlayer.deaths,
      assists: currentPlayer.assists,
      kills: currentPlayer.kills,
      kda: (currentPlayer.kills + currentPlayer.assists) / currentPlayer.deaths,
      win: currentPlayer.win,
      items: currentPlayer.items.map((itemId) => ({
        id: itemId,
        iconUrl: getItemIconUrl(itemId),
      })),
      summonerSpells: currentPlayer.summonerSpells.map((spellId) => ({
        id: spellId,
        name: getSpellName(spellId),
        iconUrl: getSummonerSpellIconUrl(getSpellName(spellId)),
      })),
    });
  }

  return matchParticipations;
}
