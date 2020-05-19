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

export interface ServerProperties {
    allow_flight: boolean;
    allow_nether: boolean;
    announce_player_achievements: boolean;
    difficulty: number;
    enable_command_block: boolean;
    force_gamemode: boolean;
    gamemode: number;
    generate_structures: boolean;
    generator_settings: string;
    hardcore: boolean;
    level_name: string;
    level_seed: string;
    level_type: string;
    max_players: number;
    pvp: boolean;
    resource_pack: string;
    resource_pack_sha1: string;
    spawn_animals: boolean;
    spawn_mobs: boolean;
    spawn_protection: number;
    view_distance: number;
}

export interface Metrics {

}

export interface ServerPlanDetails {
    id: string;
    plan_name: string;
    cost: number;
    max_players: number;
    charge_interval: number;
    ram: number;
    max_plugins: boolean;
    always_online: boolean;
    ad_free: boolean;
}

export interface ActiveServerPlanDetails {
    id: string;
    plan_name: string;
    cost: number;
    max_players: number;
    charge_interval: number;
    ram: number;
    max_plugins: boolean;
    always_online: boolean;
    ad_free: boolean;
}

export interface ServerData {
    [index: string]: string | number | boolean | string[] | ServerProperties | Metrics | ServerPlanDetails | ActiveServerPlanDetails;
    _id: string;
    owner: string;
    name: string;
    name_lower: string;
    creation: number;
    platform: string;
    __v: number;
    port: number;
    motd: string;
    credits_per_day: number;
    visibility: boolean;
    storage_node: string;
    last_online: number;
    offer: string;
    server_plan: string;
    server_properties: ServerProperties;
    suspended: boolean;
    purchased_icons: any[];
    active_plugins: any[];
    purchased_plugins: string[];
    max_ram: number;
    online: boolean;
    service_online: boolean;
    player_count: number;
    max_players: number;
    server_ip: string;
    server_port: number;
    time_no_players: number;
    players: any[];
    started_at: number;
    stopped_at: number;
    starting: boolean;
    stopping: boolean;
    exited: boolean;
    status: string;
    metrics: Metrics;
    shutdown_scheduled: boolean;
    shutdown_reason: string;
    active_server_plan: string;
    server_plan_details: ServerPlanDetails;
    active_server_plan_details: ActiveServerPlanDetails;
}

export interface LoginRes {
    _id: string;
    session: Sessions[];
    token: string;
    sessionId: string;
    servers: string[];
}

export interface Sessions {
    sessionId: string;
    created: number;
}

export interface FileRes {
    name: string;
    res: boolean;
}