import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import { ENV } from '../src/config/env.config';

const unsplashApi = createApi({
    accessKey: ENV.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch.default as unknown as typeof fetch,
})

export class UnsplashService {
    async searchImage(query: string, count: number = 1): Promise<string[]> {
        try {
            const result = await unsplashApi.search.getPhotos({
                query,
                perPage: count,
                orientation: 'landscape',
            });
    
            if (result.errors) {
                console.error('Error fetching image from Unsplash');
                return [];
            }

            return result.response.results.map(photo => photo.urls.regular);
        }  catch (error) {
            console.error('Failed to search Unsplash images: ', error);
            return [];
        }
    }

    async getTripImage(tripName: string): Promise<string | null> {
        try {
            const images = await this.searchImage(`${tripName} travel vacation`);
            return images.length > 0 ? images[0] : null;
        } catch (error){
            console.error('Failed to get Trip image: ', error);
            return null;
        }
    }


}