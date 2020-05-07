import Repository from './repository/Repository';
import Commit from './Commit';
import Pusher from './Pusher';
import Sender from './Sender';

export default interface PushPayload {
    ref: string;
    before: string;
    after: string;
    created: boolean;
    deleted: boolean;
    forced: boolean;
    base_ref?: null;
    compare: string;
    commits: Commit[]
    head_commit?: null;
    repository: Repository;
    pusher: Pusher;
    sender: Sender;
  }
  