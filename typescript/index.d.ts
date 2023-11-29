import { Axios } from 'axios';
import { Buffer } from 'buffer';

interface OptionsImgur {
    clientSecret: string;
    clientID: string;
    version?: number;
}
interface imagenOptions {
    title?: string;
    description?: string;
}

declare class ClientImgur extends Axios {
    optionsI: OptionsImgur;
    constructor(options: OptionsImgur);
    ImagenPost(imagen: Buffer, fileName?: string, options?: imagenOptions): Promise<any>;
}

export { ClientImgur };
