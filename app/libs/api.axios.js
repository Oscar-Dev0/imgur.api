"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientImgur = void 0;
const axios_1 = require("axios");
class ClientImgur extends axios_1.Axios {
    constructor(options) {
        super({
            baseURL: "https://api.imgur.com",
            headers: {
                'Client-ID': options.clientID,
            }
        });
        if (!options.version)
            options["version"] = 3;
        this.optionsI = options;
    }
    ;
    async ImagenPost(imagen, fileName = "imagen.png", options) {
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
        }
        catch (error) {
            throw {
                msg: "La imagen no se ha podido subir.",
                error,
            };
        }
        ;
    }
    ;
}
exports.ClientImgur = ClientImgur;
;
