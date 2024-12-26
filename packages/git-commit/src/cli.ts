#!/usr/bin/env bun
import { promptCommitMessage, formatCommitMessage } from './index';
import { spawn } from 'child_process';
import kleur from 'kleur';

const execGitCommand = (args: string[], options = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const git = spawn('git', args, {
      stdio: ['inherit', 'pipe', 'pipe'],
      ...options
    });

    let output = '';
    git.stdout?.on('data', (data) => {
      output += data;
    });
    git.stderr?.on('data', (data) => {
      output += data;
    });

    git.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(output || `Git command failed with code ${code}`));
      }
    });
  });
};

async function main() {
  try {
    // 检查是否在git仓库中
    try {
      await execGitCommand(['rev-parse', '--git-dir']);
    } catch (error) {
      console.error(kleur.red('✘ 当前目录不是git仓库'));
      process.exit(1);
    }

    // 检查是否有可提交的更改
    const status = await execGitCommand(['status', '--porcelain']);
    if (!status.trim()) {
      console.log(kleur.yellow('✘ 没有可提交的更改'));
      process.exit(1);
    }

    const commitMessage = await promptCommitMessage();
    const formattedMessage = formatCommitMessage(commitMessage);

    // 设置环境变量标记这是通过我们的工具提交的
    const env = {
      ...process.env,
      ARBANK_COMMIT: 'true'
    };

    // 自动添加所有更改到暂存区
    console.log(kleur.blue('📦 添加更改到暂存区...'));
    await execGitCommand(['add', '.'], { env });

    // 使用git commit命令
    console.log(kleur.blue('📝 提交更改...'));
    await execGitCommand(['commit', '-m', formattedMessage], { env });

    console.log(kleur.green('✔ 提交成功！'));
  } catch (error) {
    if (error instanceof Error) {
      console.error(kleur.red('✘ 发生错误：'), error.message);
    } else {
      console.error(kleur.red('✘ 发生未知错误'));
    }
    process.exit(1);
  }
}

main(); 