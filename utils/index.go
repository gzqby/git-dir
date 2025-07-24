package utils

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func GitLoop(resolveFolderUrl, _command string) error {
	if _command == "" {
		return errors.New("there is not any command")
	}

	fileOrFolder, err := os.ReadDir(resolveFolderUrl)
	if err != nil {
		return err
	}

	for _, file := range fileOrFolder {
		url := filepath.Join(resolveFolderUrl, file.Name())
		isGit, err := isDotGit(url)
		if err != nil {
			fmt.Println("project ", file.Name(), " stdout: ", err)
			continue
		}

		if isGit {
			output, err := gitCommand(url, _command)
			if err != nil {
				return err
			}
			outputText := output
			if output == "" {
				outputText = "no stdout and completed! \\n"
			}
			fmt.Print("project ", file.Name(), " stdout: ", outputText)
		} else {
			fmt.Println("Project", file.Name(), "is not a git project")
		}
	}

	// cdOrigin(resolveFolderUrl)
	return nil
}

func gitCommand(url, params string) (string, error) {
	// 使用shell执行复合命令
	cmd := exec.Command("sh", "-c", fmt.Sprintf("cd %s && git %s", url, params))
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("error happened: git %s", params)
	}
	return string(output), nil
}

// func cdOrigin(params string) (string, error) {
// 	cd := exec.Command("cd", params)
// 	output, err := cd.Output()
// 	if err != nil {
// 		return "", err
// 	}
// 	return string(output), nil
// }

func isDotGit(url string) (bool, error) {
	files, err := os.ReadDir(url)
	if err != nil {
		return false, err
	}
	for _, file := range files {
		if file.Name() == ".git" {
			return true, nil
		}
	}
	return false, nil
}
