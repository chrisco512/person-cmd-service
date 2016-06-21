package main

import (
	"log"
	"net/http"
	"os/exec"
	"time"
)

func checkResponse(c *http.Client, r *http.Request) bool {
	defer func() {
		if e := recover(); e != nil {
			log.Println("Error: ", e)
		}
	}()

	res, err := c.Do(r)
	if err != nil {
		panic(err)
	}

	if res.StatusCode == 200 {
		return true
	}

	return false
}

func main() {
	c := &http.Client{}
	r, err := http.NewRequest("GET", "http://kong:8001/apis", nil)
	if err != nil {
		log.Panic(err)
	}

	cmd := exec.Command("kongfig", "apply", "--path", "./config.yml", "--host", "kong:8001")

	log.Println("Starting to check for kong...")
	for {
		if checkResponse(c, r) {
			log.Println("KONG FOUND!!!")
			break
		}

		log.Println("Kong not found... Trying again in 5 seconds...")
		time.Sleep(5 * time.Second)
	}

	if err = cmd.Run(); err != nil {
		panic(err)
	}

	out, _ := cmd.Output()
	log.Println("Command Ran")
	log.Print(out)
}
