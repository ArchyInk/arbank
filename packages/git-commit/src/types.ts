export type CommitType = 
  | 'feat'     // 新功能
  | 'fix'      // 修复
  | 'docs'     // 文档更改
  | 'style'    // 代码格式
  | 'refactor' // 重构
  | 'perf'     // 性能优化
  | 'test'     // 测试
  | 'build'    // 构建系统
  | 'ci'       // CI配置
  | 'chore'    // 其他更改
  | 'revert';  // 回滚

export interface CommitMessage {
  type: CommitType;
  scope?: string;
  subject: string;
  body?: string;
  breaking?: boolean;
  issues?: string[];
} 