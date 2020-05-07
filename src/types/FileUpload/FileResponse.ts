import { Response } from 'node-fetch';

export default interface FileResponse {
    name: string;
    res: Response;
}