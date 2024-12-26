#!/usr/bin/env bun
import { promptCommitMessage, formatCommitMessage } from './index';
import { spawn } from 'child_process';
import kleur from 'kleur';

async function main() {
  try {
    const commitMessage = await promptCommitMessage();
    const formattedMessage = formatCommitMessage(commitMessage);

    // 使用git commit命令
    const git = spawn('git', ['commit', '-m', formattedMessage], {
      stdio: 'inherit'
    });

    git.on('close', (code) => {
      if (code === 0) {
        console.log(kleur.green('✔ 提交成功！'));
      } else {
        console.error(kleur.red('✘ 提交失败。'));
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(kleur.red('✘ 发生错误：'), error);
    process.exit(1);
  }
}

main(); 