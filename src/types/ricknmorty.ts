export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
}

export interface CharacterApiResponse {
  info: ApiInfo;
  results: Character[];
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export interface UseCharactersParams {
  page: number;
  searchTerm: string;
  statusFilter: string;
  genderFilter: string;
}

export interface UseCharacterParams {
  id: string | undefined;
}