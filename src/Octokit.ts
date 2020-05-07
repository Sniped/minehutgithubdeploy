import { Octokit } from '@octokit/rest';
import { config } from './Config';

export const octokit = new Octokit({
    auth: config.github.accessToken,
    userAgent: 'minehutGithubDeploy v1.2.3'
});