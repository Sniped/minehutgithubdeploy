import { Middleware, IMiddleware, Req } from '@tsed/common';

@Middleware()
export class CheckEvent implements IMiddleware {
    use(@Req() req: Req) {
        const event = req.get('X-GitHub-Event');
        if (event == 'ping') {
            return 'Pong!'
        } else return;
    }
}