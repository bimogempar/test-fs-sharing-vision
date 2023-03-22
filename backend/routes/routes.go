package routes

import (
	"backend-rest-api/module/handlers"
	"backend-rest-api/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Routes(db *gorm.DB) *gin.Engine {
	r := gin.Default()
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})
	r.Use(utils.CORSMiddleware())

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Server running successfully bro!",
		})
	})

	r.POST("/article", handlers.CreatePost)
	r.GET("/article", handlers.GetPosts)
	r.GET("/article/:id", handlers.GetPostById)
	r.PATCH("/article/:id", handlers.UpdatePost)
	r.DELETE("/article/:id", handlers.DeletePost)

	return r
}
