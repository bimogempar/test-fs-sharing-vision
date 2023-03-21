package handlers

import (
	"backend-rest-api/module/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePost(c *gin.Context){
	var input models.PostInput
	c.ShouldBindJSON(&input)

	if err := input.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to create post",
			"error": err.Error(),
		})
		return
	}

	post := models.Post{Title: input.Title, Content: input.Content, Category: input.Category, Status: input.Status, Created_date: time.Now(), Updated_date: time.Now()}
	db := c.MustGet("db").(*gorm.DB)
	db.Create(&post)

	c.JSON(http.StatusOK, gin.H{
		"message": "Post created successfully",
		"data": post,
	})
}