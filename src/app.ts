import { $log, ServerLoader } from '@tsed/common';
import { Server } from './Server';
import { checkIfConfigExists } from './Config';

if (!checkIfConfigExists()) {
    $log.fatal('No configuration given, exiting process...');
    process.exit(0);
}

async function bootstrap() {
    try {
        $log.debug('Starting server...');
        const server = await ServerLoader.bootstrap(Server);
        
        await server.listen();
        $log.debug('Server initialized')
    } catch (e) {
        $log.error(e);
    }
}

bootstrap()