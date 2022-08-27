import sharp from 'sharp';
import { stat } from 'fs/promises';

const process = async (
    inputPath: string,
    outputPath: string,
    width: string,
    height: string
): Promise<sharp.OutputInfo> => {
    return await sharp(inputPath)
        .resize(parseInt(width), parseInt(height))
        .toFile(outputPath);
};

const exists = async (imageOutput: string): Promise<boolean> => {
    return await stat(imageOutput)
        .then(() => true)
        .catch(() => false);
};

export { process, exists };
