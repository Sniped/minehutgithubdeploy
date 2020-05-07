import { Middleware, IMiddleware, Req } from '@tsed/common';
import { Forbidden } from '@tsed/exceptions';

@Middleware()
export class CheckEvent implements IMiddleware {
    use(@Req() req: Req) {
        if (req.get('X-GitHub-Event') == 'ping') {
            throw new Forbidden('Pong')
        }
        return;
    }
}