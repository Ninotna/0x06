// js/factories/media.js

import PhotographerProfileTemplate from '../templates/photographerProfile.js';

class PhotographerFactory
{
	constructor(cardObject, type)
	{
		let post;
		if (type === "video")
		{
			post = new PhotographerProfileTemplate(cardObject).createPostVideo();
		}
		else if (type === "image")
		{
			post = new PhotographerProfileTemplate(cardObject).createPostImage();
		}
		else
		{
			throw "Photographer factory error: unknown type format";
		}
        return post;
	}
}

export { PhotographerFactory };