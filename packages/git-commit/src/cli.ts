#!/usr/bin/env bun
import { promptCommitMessage, formatCommitMessage } from './index';
import { spawn } from 'child_process';
import kleur from 'kleur';

const execGitCommand = (args: string[], options = {}) => {
  return new Promise((resolve, reject) => {
    // 在Windows下，如果参数包含空格，需要特殊处理
    const processedArgs = args.map(arg => {
      if (arg.includes(' ')) {
        // 确保使用双引号，并处理可能的内部引号
        return `"${arg.replace(/"/g, '\\"')}"`;
      }
      return arg;
    });

    // 在Windows下，我们使用cmd.exe来执行git命令
    const isWindows = process.platform === 'win32';
    const command = isWindows ? ['git', ...processedArgs].join(' ') : 'git';
    const spawnArgs = isWindows ? ['/c', command] : args;
    const spawnOptions = isWindows ? { shell: true, ...options } : options;

    const git = spawn(
      isWindows ? process.env.ComSpec || 'cmd.exe' : 'git',
      spawnArgs,
      {
        stdio: 'inherit',
        ...spawnOptions
      }
    );

    git.on('close', (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`Git command failed with code ${code}`));
      }
    });
  });
};

async function main() {
  try {
    // 检查是否在git仓库中
    const gitStatus = spawn('git', ['status'], {
      stdio: 'ignore',
      shell: true
    });

    await new Promise((resolve, reject) => {
      gitStatus.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('当前目录不是git仓库'));
        }
        resolve(null);
      });
    });

    // 检查是否有可提交的更改
    const checkStatus = spawn('git', ['status', '--porcelain'], {
      stdio: 'pipe',
      shell: true
    });

    let hasChanges = false;
    checkStatus.stdout?.on('data', (data) => {
      if (data.toString().trim()) {
        hasChanges = true;
      }
    });

    await new Promise((resolve) => checkStatus.on('close', resolve));

    if (!hasChanges) {
      console.log(kleur.yellow('✘ 没有可提交的更改'));
      process.exit(1);
    }

    const commitMessage = await promptCommitMessage();
    const formattedMessage = formatCommitMessage(commitMessage);

    // 设置环境变量标记这是通过我们的工具提交的
    const env = {
      ...process.env,
      ARBANK_COMMIT: 'true',
      // Windows下需要显式设置这些shell相关的环境变量
      SHELL: process.env.SHELL || process.env.ComSpec,
      PATH: process.env.PATH
    };

    // 自动添加所有更改到暂存区
    console.log(kleur.blue('📦 添加更改到暂存区...'));
    await execGitCommand(['add', '.'], { env });

    // 使用git commit命令
    console.log(kleur.blue('📝 提交更改...'));
    await execGitCommand(['commit', '-m', formattedMessage], { env });

    console.log(kleur.green('✔ 提交成功！'));
  } catch (error) {
    console.error(kleur.red('✘ 发生错误：'), error);
    process.exit(1);
  }
}

main(); 