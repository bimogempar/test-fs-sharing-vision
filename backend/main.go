package main

import (
	"backend-rest-api/config"
	"backend-rest-api/routes"
	"os"
)

func main() {
	db := config.InitDB()
	r := routes.Routes(db)
	r.Run(os.Getenv("APP_PORT"))
}
