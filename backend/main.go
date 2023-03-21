package main

import (
	"backend-rest-api/config"
	"backend-rest-api/routes"
)

func main(){
	db := config.InitDB()
	r := routes.Routes(db)
	r.Run()
}