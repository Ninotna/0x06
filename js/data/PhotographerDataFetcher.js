import PhotographersApi from "../data/photographersApi.js";

export class PhotographerDataFetcher {
  constructor(apiUrl) {
    this.usersDataApi = new PhotographersApi(apiUrl);
  }

  async fetchData() {
    try {
      const photosData = await this.usersDataApi.getPhotos();
      return photosData;
    } catch (error) {
      console.error("Échec de la récupération des données :", error);
      return { error: true, message: error.message };
    }
  }
}
