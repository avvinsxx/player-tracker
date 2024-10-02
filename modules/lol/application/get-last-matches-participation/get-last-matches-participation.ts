import { ensure } from "@/modules/core/infrastructure/utils";
import { getChampionIconUrl } from "../../domain/champion/champion";
import {
  getItemIconUrl,
  getSummonerSpellIconUrl,
} from "../../domain/match/match";
import AccountService from "../../infrastructure/account";
import LocalDataService from "../../infrastructure/local-data";
import MatchService from "../../infrastructure/match";
import { ViewModel } from "../../presentation/components/server/matches/view-model";

interface GetLastMatchesParticipationInput {
  name: string;
  tag: string;
  platform: string;
}

const dependencies = {
  getAccount: AccountService.getAccount,
  getLast10MatchesId: MatchService.getLast10MatchesId,
  getMatch: MatchService.getMatch,
  getChampionName: LocalDataService.getChampionName,
  getSpellName: LocalDataService.getSpellName,

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
  }: typeof dependencies = dependencies,
) {
  const account = await getAccount(name, tag, platform);
  const matchesId = await getLast10MatchesId(account.id, platform);

  const fetchMatchPromises = [];

  for (const matchId of matchesId) {
    fetchMatchPromises.push(getMatch(matchId, platform));
  }

  const matches = await Promise.all(fetchMatchPromises);

  const matchParticipations: ViewModel[] = [];
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
        name: LocalDataService.getChampionName(currentPlayer.championId),
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
