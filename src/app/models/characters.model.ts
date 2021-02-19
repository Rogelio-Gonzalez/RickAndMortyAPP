export module TypeModels {

  export interface Info {
      count: number;
      pages: number;
      next: string;
      prev?: any;
  }
  export interface Origin {
      name: string;
      url: string;
  }
  export interface Location {
      name: string;
      url: string;
  }
  export interface Episodes {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: Date;
}
  export interface Result {
      id: number;
      name: string;
      status: string;
      species: string;
      type: string;
      gender: string;
      origin: Origin;
      location: Location;
      image: string;
      episode: Episodes;
      url: string;
      created: Date;
  }
  export interface RootObject {
      info: Info;
      results: Result[];
  }
}
export default TypeModels;
