import { Axios } from "axios";
//import FormData from "form-data";
import { OptionsImgur, imagenOptions } from "../assets/api.secret";
import { Buffer } from "buffer";

export class ClientImgur extends Axios {
    public optionsI: OptionsImgur;

    constructor(options: OptionsImgur){
        super({
            baseURL: "https://api.imgur.com",
            headers: {
                'Client-ID': options.clientID,
            }
        });
        if(!options.version) options["version"] = 3;
        this.optionsI = options;
    };


    async ImagenPost(imagen: Buffer, fileName: string = "imagen.png", options?: imagenOptions){

        try {
            const form = new FormData();
            form.append('type', 'file');
            form.append('name', fileName);
            form.append('title', options?.title ?? '1x1 Pixel');
            form.append('description', options?.description ?? 'This is a 1x1 pixel image.');
            form.append('disable_audio', '1');
            form.append("image", new File([imagen], fileName));

            const data = JSON.parse((await this.post(`/${this.optionsI.version}/upload`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                
            })).data);

            return data;
        } catch (error) {
            throw {
                msg: "La imagen no se ha podido subir.",
                error,
            };
        };
    };

};
