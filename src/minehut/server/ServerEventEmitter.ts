import { EventEmitter } from "events";
import { ServerEvent, ServerEventComparison } from "./types/EventTypes";
import { ServerData } from "./types/ResTypes";
import Server from "./Server";

export default class ServerEventEmitter extends EventEmitter {
    
    events: ServerEvent[];
    server?: Server | null;

    constructor(events: ServerEvent[], server?: Server) {
        super();
        this.server = server || null;
        this.events = events;
    }

    listen() {
        if (!this.server) throw new Error('No server specified!');
        const eventComparisons: ServerEventComparison[] = [];
        setInterval(async () => {
            for (var i = 0; i < this.events.length; i++) {
                const event = this.events[i];
                const data: ServerData = await this.server!.getAllData();
                const val = data[event.change];
                const comparison: ServerEventComparison = (eventComparisons.filter(ec => ec.name === event.name))[0];
                if (eventComparisons.length > 0 && comparison) {
                    let values = comparison.val;
                    console.log(values);
                    if (values.length >= 2) {
                        if (values[0] != values[1]) {
                            console.log(`${values[0]} - ${values[1]}`);
                            this.emit('change', event.name, values[1]);
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