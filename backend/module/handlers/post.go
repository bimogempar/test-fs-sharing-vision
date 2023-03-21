package handlers

import (
	"backend-rest-api/module/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePost(c *gin.Context) {
	var input models.PostInput
	c.ShouldBindJSON(&input)

	if err := input.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to create post",
			"error":   err.Error(),
		})
		return
	}

	var status string
	if input.Status == "" {
		status = "publish"
	} else {
		status = input.Status
	}

	post := models.Post{Title: input.Title, Content: input.Content, Category: input.Category, Status: status, Created_date: time.Now(), Updated_date: time.Now()}
	db := c.MustGet("db").(*gorm.DB)
	db.Create(&post)

	c.JSON(http.StatusOK, gin.H{
		"message": "Post created successfully",
		"data":    post,
	})
}

func GetPosts(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var posts []models.Post

	limit, _ := strconv.Atoi(c.Query("limit"))
	offset, _ := strconv.Atoi(c.Query("offset"))
	if limit > 0 && offset > 0 {
		db.Limit(limit).Offset(offset).Find(&posts)
	} else {
		db.Find(&posts)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Post fetch successfully",
		"data":    posts,
	})
}

func GetPostById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var post models.Post
	paramId, _ := strconv.Atoi(c.Param("id"))

	if err := db.Where("id = ?", paramId).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"message": "Failed to fetch detail post",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Post detail fetch successfully",
		"data":    post,
	})
}

func UpdatePost(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var post models.Post
	paramId, _ := strconv.Atoi(c.Param("id"))

	if err := db.Where("id = ?", paramId).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"message": "Failed to fetch detail post",
			"error":   err.Error(),
		})
		return
	}

	var input models.PostInput
	c.ShouldBindJSON(&input)

	if err := input.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to update post",
			"error":   err.Error(),
		})
		return
	}

	var status string
	if input.Status == "" {
		status = "publish"
	} else {
		status = input.Status
	}

	var updatedPost models.Post
	updatedPost.ID = post.ID
	updatedPost.Title = input.Title
	updatedPost.Content = input.Content
	updatedPost.Category = input.Category
	updatedPost.Status = status
	updatedPost.Updated_date = time.Now()

	db.Model(&post).Updates(updatedPost)
	c.JSON(http.StatusOK, gin.H{
		"message": "Post updated successfully",
		"data":    updatedPost,
	})
}

func DeletePost(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var post models.Post
	paramId, _ := strconv.Atoi(c.Param("id"))

	if err := db.Where("id = ?", paramId).First(&post).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"message": "Failed to delete post",
			"error":   err.Error(),
		})
		return
	}
	db.Delete(&post)

	c.JSON(http.StatusOK, gin.H{
		"message": "Post delete successfully",
		"data":    post,
	})
}
