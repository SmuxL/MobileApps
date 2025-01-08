import { createClient, type ClientConfig } from '@sanity/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import imageUrlBuilder from '@sanity/image-url'
const config: ClientConfig = {
    projectId: '9o141tol',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2025-01-08', // use current date (YYYY-MM-DD) to target the latest API version
}
const client = createClient(config)
const builder = imageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
    return builder.image(source)
}
export default client
