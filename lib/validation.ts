import { url } from 'inspector';
import {z} from 'zod';
export const formSchema = z.object({
    title:z.string().min(3).max(100),
    description:z.string().min(20).max(500),
    category:z.string().min(3).max(20),
    /**here i will chnage to upload photo rather than link */
    link: z.string().url().refine((url) => {
        // Check if URL ends with common image extensions
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
        try {
            const urlObj = new URL(url);
            return imageExtensions.test(urlObj.pathname);
        } catch {
            return false;
        }
    }, {
        message: "Please provide a valid image URL ending with .jpg, .jpeg, .png, .gif, or .webp"
    }),
    pitch: z.string().min(10),

});