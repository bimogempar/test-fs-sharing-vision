package routes

import (
	"backend-rest-api/module/handlers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Routes(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Server running successfully bro!",
		})
	})
	
	r.POST("/article", handlers.CreatePost)
	

	return r
}
