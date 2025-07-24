#!/bin/bash

# 清理 dist 目录
rm -rf dist
mkdir -p dist

# 构建目标平台列表
platforms=(
    "linux/amd64"
    "linux/arm64" 
    "darwin/amd64"
    "darwin/arm64"
    "windows/amd64"
    "windows/arm64"
)

echo "Building for multiple platforms..."

for platform in "${platforms[@]}"
do
    platform_split=(${platform//\// })
    GOOS=${platform_split[0]}
    GOARCH=${platform_split[1]}
    
    output_name="git-dir-$GOOS-$GOARCH"
    if [ $GOOS = "windows" ]; then
        output_name+='.exe'
    fi
    
    echo "Building $output_name..."
    env GOOS=$GOOS GOARCH=$GOARCH go build -o dist/$output_name main.go
    
    if [ $? -ne 0 ]; then
        echo 'An error has occurred! Aborting the script execution...'
        exit 1
    fi
done

echo "Build completed!" 