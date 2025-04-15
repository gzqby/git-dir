package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/gzqby/git-dir/utils"
)

func main() {
	folder := flag.String("d", ".", "A parent directory you need to provide (default: current directory), this will execute git command in all child directory of this directory")
	flag.Parse()

	args := flag.Args()

	if len(args) == 0 {
		fmt.Println("Please provide a git command")
		os.Exit(1)
	}

	_command := strings.Join(args, " ")

	wd, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting working directory:", err)
		os.Exit(1)
	}

	resolveFolderUrl := filepath.Join(wd, *folder)

	err = utils.GitLoop(resolveFolderUrl, _command)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
