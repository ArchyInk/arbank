export type CommitType = 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'build' | 'ci' | 'chore' | 'revert';
export interface CommitMessage {
    type: CommitType;
    scope?: string;
    subject: string;
    body?: string;
    breaking?: boolean;
    issues?: string[];
}
