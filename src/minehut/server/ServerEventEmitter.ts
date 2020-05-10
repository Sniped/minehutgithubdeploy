import { EventEmitter } from "events";
import { ServerEvent, ServerEventComparison } from "./types/EventTypes";
import { server } from '../../Minehut';
import { ServerData } from "./types/ResTypes";

export default class ServerEventEmitter extends EventEmitter {
    
    events: ServerEvent[];

    constructor(events: ServerEvent[]) {
        super();
        this.events = events;
    }

    listen() {
        const eventComparisons: ServerEventComparison[] = [];
        setInterval(async () => {
            for (var i = 0; i < this.events.length; i++) {
                const event = this.events[i];
                const data: ServerData = await server.getAllData();
                const val = data[event.change];
                const comparison: ServerEventComparison = (eventComparisons.filter(ec => ec.name === event.name))[0];
                if (eventComparisons.length > 0 && comparison) {
                    let values = comparison.val;
                    if (values.length >= 2) {
                        if (values[0] != values[1]) {
                            this.emit('change', values[1]);
                        }
                        values = [val];
                    } else {
                        values.push(val);
                    }
                    const pos = eventComparisons.indexOf(comparison);
                    eventComparisons.splice(pos);
                    comparison.val = values;
                    eventComparisons.push(comparison);
                } else {
                    const nComparison: ServerEventComparison = { name: event.name, val: [val] }
                    eventComparisons.push(nComparison);
                }
            }
        }, 1000);
    }

}