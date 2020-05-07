import { Get, Controller } from '@tsed/common';

@Controller('/')
export class IndexController {
    @Get()
    res(): string {
        return "api is online.";
    }
}