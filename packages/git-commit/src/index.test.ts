import { describe, it, expect } from 'vitest';
import { formatCommitMessage } from './index';
import type { CommitMessage } from './types';

describe('formatCommitMessage', () => {
  it('should format basic commit message', () => {
    const commit: CommitMessage = {
      type: 'feat',
      subject: 'add new feature'
    };
    expect(formatCommitMessage(commit)).toBe('feat: add new feature');
  });

  it('should include scope when provided', () => {
    const commit: CommitMessage = {
      type: 'fix',
      scope: 'core',
      subject: 'fix bug'
    };
    expect(formatCommitMessage(commit)).toBe('fix(core): fix bug');
  });

  it('should handle breaking changes', () => {
    const commit: CommitMessage = {
      type: 'feat',
      subject: 'new api',
      breaking: true
    };
    expect(formatCommitMessage(commit)).toBe(
      'feat!: new api\n\nBREAKING CHANGE: 此更改包含破坏性修改。'
    );
  });

  it('should include body when provided', () => {
    const commit: CommitMessage = {
      type: 'feat',
      subject: 'new feature',
      body: 'Detailed description'
    };
    expect(formatCommitMessage(commit)).toBe(
      'feat: new feature\n\nDetailed description'
    );
  });

  it('should format issues references', () => {
    const commit: CommitMessage = {
      type: 'fix',
      subject: 'bug fix',
      issues: ['123', '#456']
    };
    expect(formatCommitMessage(commit)).toBe(
      'fix: bug fix\n\nRefs: #123, #456'
    );
  });

  it('should handle all features combined', () => {
    const commit: CommitMessage = {
      type: 'feat',
      scope: 'api',
      subject: 'new endpoint',
      body: 'Added new endpoint for user management',
      breaking: true,
      issues: ['123', '456']
    };
    expect(formatCommitMessage(commit)).toBe(
      'feat(api)!: new endpoint\n\n' +
      'Added new endpoint for user management\n\n' +
      'BREAKING CHANGE: 此更改包含破坏性修改。\n\n' +
      'Refs: #123, #456'
    );
  });
}); 