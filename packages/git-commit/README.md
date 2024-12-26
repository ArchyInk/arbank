# @arbank/git-commit

一个交互式的git commit消息格式化工具，帮助你遵循约定式提交规范。

## 特性

- 📝 交互式提交信息收集
- 🎯 符合约定式提交规范
- 🌈 美观的命令行界面
- 🔧 支持scope、breaking changes和issues引用
- 🚫 强制使用工具提交，禁止直接使用git commit

## 安装

### 作为项目依赖安装

```bash
# 使用pnpm
pnpm add -D @arbank/git-commit simple-git-hooks

# 使用npm
npm install -D @arbank/git-commit simple-git-hooks

# 使用yarn
yarn add -D @arbank/git-commit simple-git-hooks

# 使用bun
bun add -D @arbank/git-commit simple-git-hooks
```

### 配置git hooks

在你的package.json中添加以下配置：

```json
{
  "scripts": {
    "postinstall": "simple-git-hooks",
    "commit": "git-commit"
  },
  "simple-git-hooks": {
    "commit-msg": "node scripts/verify-commit.js $1"
  }
}
```

然后创建`scripts/verify-commit.js`文件：

```js
const fs = require('fs');

// 获取commit消息文件路径
const msgPath = process.argv[2];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

// 检查是否是通过我们的工具提交的
if (process.env.ARBANK_COMMIT !== 'true') {
  console.log('\x1b[31m%s\x1b[0m', '❌ 请使用 \'pnpm commit\' 命令来提交代码');
  process.exit(1);
}
```

## 使用

安装配置完成后，你将无法直接使用`git commit`命令，而需要使用以下命令进行提交：

```bash
pnpm commit  # 如果你使用pnpm
# 或
npm run commit  # 如果你使用npm
# 或
yarn commit  # 如果你使用yarn
# 或
bun run commit  # 如果你使用bun
```

工具会引导你填写以下信息：

1. 提交类型（必选）：
   - ✨ feat: 新功能
   - 🐛 fix: 修复
   - 📝 docs: 文档更改
   - 💄 style: 代码格式
   - ♻️ refactor: 重构
   - ⚡️ perf: 性能优化
   - ✅ test: 测试
   - 📦 build: 构建系统
   - 👷 ci: CI配置
   - 🔨 chore: 其他更改
   - ⏪ revert: 回滚

2. 影响范围（可选）：表示此次更改影响的范围，例如：core、ui、api等

3. 简短描述（必填）：简明扼要地描述此次更改

4. 详细描述（可选）：提供更多上下文信息

5. 是否包含破坏性更改（可选）：如果是，会在提交信息中添加`!`标记

6. 关联的issue（可选）：可以关联一个或多个issue编号

## 提交消息格式

工具会自动将你的输入格式化为以下格式：

```
<type>(<scope>)!: <subject>

<body>

BREAKING CHANGE: 此更改包含破坏性修改。

Refs: #123, #456
```

## 特殊情况

- 工具会自动将所有更改添加到暂存区（相当于`git add .`）
- 如果没有可提交的更改，工具会提示并退出

## License

MIT 