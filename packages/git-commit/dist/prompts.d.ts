import type { CommitType } from './types';
export declare function promptCommitMessage(): Promise<{
    type: CommitType;
    scope: any;
    subject: any;
    body: any;
    breaking: any;
    issues: any;
}>;
