import prompts from 'prompts';
import type { CommitType } from './types';

const typeChoices = [
  { title: '✨ feat: 新功能', value: 'feat' },
  { title: '🐛 fix: 修复', value: 'fix' },
  { title: '📝 docs: 文档更改', value: 'docs' },
  { title: '💄 style: 代码格式', value: 'style' },
  { title: '♻️ refactor: 重构', value: 'refactor' },
  { title: '⚡️ perf: 性能优化', value: 'perf' },
  { title: '✅ test: 测试', value: 'test' },
  { title: '📦 build: 构建系统', value: 'build' },
  { title: '👷 ci: CI配置', value: 'ci' },
  { title: '🔨 chore: 其他更改', value: 'chore' },
  { title: '⏪ revert: 回滚', value: 'revert' }
];

export async function promptCommitMessage() {
  const response = await prompts([
    {
      type: 'select',
      name: 'type',
      message: '选择提交类型:',
      choices: typeChoices,
      initial: 0
    },
    {
      type: 'text',
      name: 'scope',
      message: '输入影响范围 (可选):',
      initial: ''
    },
    {
      type: 'text',
      name: 'subject',
      message: '输入简短描述:',
      validate: value => value.length > 0 ? true : '描述不能为空'
    },
    {
      type: 'text',
      name: 'body',
      message: '输入详细描述 (可选):',
      initial: ''
    },
    {
      type: 'confirm',
      name: 'breaking',
      message: '是否包含破坏性更改?',
      initial: false
    },
    {
      type: 'text',
      name: 'issues',
      message: '关联的issue (用逗号分隔, 可选):',
      initial: ''
    }
  ]);

  return {
    type: response.type as CommitType,
    scope: response.scope || undefined,
    subject: response.subject,
    body: response.body || undefined,
    breaking: response.breaking,
    issues: response.issues ? response.issues.split(',').map(i => i.trim()) : undefined
  };
} 