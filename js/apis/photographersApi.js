class Api {
    constructor(url) {
      this.url = url;
    }
  
    async get() {
      try {
        const response = await fetch(this.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data === undefined) {
          throw new Error("Data is undefined");
        }
        return data;
      } catch (apiError) {
        if (apiError instanceof TypeError) {
          console.error("Network error:", apiError);
        } else {
          console.error("API error:", apiError);
        }
        return { error: true, message: apiError.message || apiError };
      }
    }
  }
  
  class PhotographersApi extends Api {
    constructor(url) {
      super(url);
    }
  
    async getPhotos() {
      return await this.get();
    }
  }
  
  export default PhotographersApi;
  