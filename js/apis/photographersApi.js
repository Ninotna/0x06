class Api {
	/** 
	 * @arg url: The URL of the API endpoint.
	 */
	constructor(url)
	{
		this.url = url;
	}

	/**
	 * Fetches data from the API endpoint and returns it as JSON.
	 * @return: The JSON data from the API or an error object.
	 */
	async get()
	{
		try
		{
			const response = await fetch(this.url); /* Fetch data from the API */

			/* Check if the response status is OK (200-299) */
			if (!response.ok)
			{
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json(); /* Parse the response as JSON */

			/* Check if the data is undefined */
			if (data === undefined)
			{
				throw new Error("Data is undefined");
			}

			return (data); /* Return the data */
		}
		catch (apiError)
		{
			/* Handle network errors (e.g., no internet connection) */
			if (apiError instanceof TypeError)
			{
				console.error("Network error:", apiError);
			}
			else
			{
				/* Handle API errors (e.g., invalid URL, server errors) */
				console.error("API error:", apiError);
			}
			return ({ error: true, message: apiError.message || apiError }); /* Return an error object */
		}
	}
}

class PhotographersApi extends Api {
	/**
	 * @arg url: The URL of the photographers API endpoint.
	 */
	constructor(url)
	{
		super(url);
	}

	/**
	 * Fetches photos data from the photographers API.
	 * @return: The JSON data from the photographers API or an error object.
	 */
	async getPhotos()
	{
		return (await this.get());
	}
}

export default PhotographersApi;
