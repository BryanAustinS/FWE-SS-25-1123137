import { createApi } from 'unsplash-js';
import * as nodeFetch from 'node-fetch';
import { ENV } from './config/env.config';

const backupImage = [
    "https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

const unsplashApi = createApi({
    accessKey: ENV.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch.default as unknown as typeof fetch,
})

export class UnsplashService {
    async searchImage(query: string, count: number = 1): Promise<string[]> {
        try {
            console.log(`Searching Unsplash for: ${query}`);
            const result = await unsplashApi.search.getPhotos({
                query: query,
                perPage: count,
                orientation: 'landscape',
            });
    
            if (result.errors) {
                console.error('Error fetching image from Unsplash:', result.errors);
                return [this.getBackupImage()];
            }

            const images = result.response.results.map(photo => photo.urls.regular);
            console.log(`Found ${images.length} images`);
            return images.length > 0 ? images : [this.getBackupImage()];
        } catch (error) {
            console.error('Failed to search Unsplash images: ', error);
            return [this.getBackupImage()];
        }
    }

    async getTripImage(tripName: string): Promise<string | null> {
        try {
            const images = await this.searchImage(`${tripName}`);
            return images[0];
        } catch (error){
            console.error('Failed to get Trip image: ', error);
            return this.getBackupImage();
        }
    }

    private getBackupImage(): string {
        const randomIndex = Math.floor(Math.random() * backupImage.length);
        return backupImage[randomIndex];
    }
}