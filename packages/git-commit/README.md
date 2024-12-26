# @arbank/git-commit

一个交互式的git commit消息格式化工具，帮助你遵循约定式提交规范。

## 特性

- 📝 交互式提交信息收集
- 🎯 符合约定式提交规范
- 🌈 美观的命令行界面
- 🔧 支持scope、breaking changes和issues引用

## 安装

```bash
# 使用pnpm
pnpm add -D @arbank/git-commit

# 使用npm
npm install -D @arbank/git-commit

# 使用yarn
yarn add -D @arbank/git-commit

# 使用bun
bun add -D @arbank/git-commit
```

## 使用

替换原有的git commit命令：

```bash
git-commit
```

或者在package.json中添加script：

```json
{
  "scripts": {
    "commit": "git-commit"
  }
}
```

然后使用：

```bash
pnpm commit
# 或
npm run commit
# 或
yarn commit
# 或
bun run commit
```

## 提交类型

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

## License

MIT 