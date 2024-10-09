export interface Summoner {
  id: string;
  iconId: number;
  level: number;
}

export function getTierIconUrl(tier: string) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${tier.toLowerCase()}.png`;
}

export function getSummonerIconUrl(iconId: number) {
  return `https://cdn.communitydragon.org/14.15.1/profile-icon/${iconId}`;
}
