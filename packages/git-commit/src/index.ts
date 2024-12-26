import type { CommitMessage } from './types';

export function formatCommitMessage(commit: CommitMessage): string {
  const parts: string[] = [];

  // Type and scope
  parts.push(commit.type);
  if (commit.scope) {
    parts[0] += `(${commit.scope})`;
  }

  // Breaking change marker
  if (commit.breaking) {
    parts[0] += '!';
  }

  // Subject
  parts[0] += `: ${commit.subject}`;

  // Body
  if (commit.body) {
    parts.push('', commit.body);
  }

  // Breaking change block
  if (commit.breaking) {
    parts.push('', 'BREAKING CHANGE: 此更改包含破坏性修改。');
  }

  // Issues
  if (commit.issues && commit.issues.length > 0) {
    const issuesList = commit.issues.map(issue => {
      if (issue.startsWith('#')) return issue;
      return `#${issue}`;
    }).join(', ');
    parts.push('', `Refs: ${issuesList}`);
  }

  return parts.join('\n');
}

export { promptCommitMessage } from './prompts'; 