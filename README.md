# ARBank Tools

基于Bun运行时的开发工具集合，提供一系列提升开发效率的工具。

## 工具包列表

### [@arbank/git-commit](./packages/git-commit)

一个交互式的git commit消息格式化工具，帮助你遵循约定式提交规范。

特性：
- 📝 交互式提交信息收集
- 🎯 符合约定式提交规范
- 🌈 美观的命令行界面
- 🔧 支持scope、breaking changes和issues引用
- 🚫 强制使用工具提交，禁止直接使用git commit

快速开始：
```bash
# 安装
pnpm add -D @arbank/git-commit simple-git-hooks

# 使用
pnpm commit
```

详细使用说明请查看[git-commit文档](./packages/git-commit/README.md)。

## 开发

本项目使用pnpm管理工作区：

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 运行测试
pnpm test
```

## 项目结构

```
packages/
  ├── git-commit/     # git commit交互式格式化工具
  └── ... (更多工具开发中)
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`pnpm commit`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## License

MIT 