export default interface Commit {
    sha: string;
    message: string;
    author: {
        name: string;
        email: string;
    }
    url: string;
    distinct: boolean;
}