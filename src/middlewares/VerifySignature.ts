import { Middleware, IMiddleware, Req } from '@tsed/common';
import * as crypto from 'crypto';
import { config } from '../Config';
import { Unauthorized } from '@tsed/exceptions';

@Middleware()
export class VerifySignature implements IMiddleware {
    use(@Req() req: Req) {
        const payload = JSON.stringify(req.body);
        const sig = req.get('X-Hub-Signature');
        if (!sig) return;
        const hmac = crypto.createHmac('sha1', config.secret);
        const digest = Buffer.from(`sha1=${hmac.update(payload).digest('hex')}`, 'utf8');
        const checksum = Buffer.from(sig, 'utf8');
        if (!crypto.timingSafeEqual(digest, checksum)) {
            throw new Unauthorized('Validation could not be done!');
        }
        return;
    }
} 