# Git-Dir

A CLI tool to execute git commands recursively in all subdirectories that contain a `.git` folder.

## Installation

```bash
npm install -g @zgo/git-dir
```

The package will automatically install the correct binary for your platform (Linux, macOS, Windows) and architecture (x64, arm64).

## Usage

```bash
git-dir [-d directory] <git-command> [git-args...]
```

### Options

- `-d directory`: Specify the parent directory to search for git repositories (default: current directory)

### Examples

```bash
# Check status of all git repos in current directory
git-dir status

# Check status of all git repos in a specific directory
git-dir -d ~/projects status

# Pull all repositories
git-dir pull

# Add and commit changes in all repositories
git-dir add .
git-dir commit -m "Update all repos"

# Push all repositories
git-dir push
```

## How it works

The tool will:
1. Scan the specified directory (or current directory) for subdirectories
2. Check each subdirectory for a `.git` folder
3. Execute the provided git command in each directory that contains a git repository
4. Display the output for each repository

## Supported Platforms

- Linux (x64, arm64)
- macOS (x64, arm64) 
- Windows (x64, arm64)

## License

ISC