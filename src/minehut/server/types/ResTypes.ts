export interface StatusRes {
    online: boolean;
    service_online: boolean;
    player_count: number;
    max_players: number;
    server_ip: string;
    time_no_players: number;
    players: string[];
    started_at: number;
    stopped_at?: number;
    starting: boolean;
    stopping: boolean;
    exited?: boolean;
    status: 'SERVICE_OFFLINE' | 'STARTING' | 'ONLINE' | 'OFFLINE';
    server_plan: string;
    shutdown_scheduled: boolean;
    shutdown_reason?: string;
}

export interface FileRes {
    name: string;
    res: boolean;
}