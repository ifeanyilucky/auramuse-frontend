export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: number;
  duration: string;
  mood: string;
  tempo: number;
  key: string;
  instruments: string[];
  whyThisSong: string;
  similarArtists: string[];
  perfectFor: string;
  spotifyUrl: string;
  youtubeUrl: string;
}
