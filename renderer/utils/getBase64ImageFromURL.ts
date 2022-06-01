import axios from "axios";

export async function getBase64ImageFromURL(url: string): Promise<string> {
    try {
        let image = await axios.get(url, { responseType: 'arraybuffer' });
        let raw = Buffer.from(image.data).toString('base64');
        return "data:" + image.headers["content-type"] + ";base64," + raw;
    } catch (_) {
        return await getBase64ImageFromURL(`${process.env.NEXT_PUBLIC_KOMBINATIONS_IMAGE_URL}`);
    }
}