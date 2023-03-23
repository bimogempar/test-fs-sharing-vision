package config

import (
	"backend-rest-api/module/models"
	"backend-rest-api/utils"
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func InitDB() *gorm.DB {
	var (
		USER   = utils.GetEnvVariable("DB_USER")
		PASS   = utils.GetEnvVariable("DB_PASS")
		HOST   = utils.GetEnvVariable("DB_HOST")
		PORT   = utils.GetEnvVariable("DB_PORT")
		DBNAME = utils.GetEnvVariable("DB_DBNAME")
	)
	URL := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", USER, PASS, HOST, PORT, DBNAME)
	db, err := gorm.Open(mysql.Open(URL))
	if err != nil {
		panic(err.Error())
	}

	db.AutoMigrate(&models.Post{})
	return db
}
