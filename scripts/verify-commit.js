const fs = require('fs');

// 获取commit消息文件路径
const msgPath = process.argv[2];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

// 允许changeset相关的提交通过
if (msg.startsWith('chore: add changeset') || msg.startsWith('chore: version packages')) {
  process.exit(0);
}

// 检查是否是通过我们的工具提交的
if (process.env.ARBANK_COMMIT !== 'true') {
  console.log('\x1b[31m%s\x1b[0m', '❌ 请使用 \'pnpm commit\' 命令来提交代码');
  process.exit(1);
} 