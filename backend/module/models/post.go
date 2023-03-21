package models

import "time"

type Post struct {
	ID 					int64 `json:"id" gorm:"primary_key;auto_increment"`
	Title 				string `json:"title" gorm:"type:varchar(200)"`
	Content 			string `json:"content" gorm:"type:text"`
	Category 			string `json:"category" gorm:"type:varchar(100)"`
	Created_date    	time.Time `gorm:"default:CURRENT_TIMESTAMP()"`
	Updated_date		time.Time `gorm:"default:CURRENT_TIMESTAMP()"`
	Status				string `json:"status" gorm:"type:varchar(100)"`
}

type PostInput struct {
	Title			string `binding:"required"`
	Content			string `binding:"required"`
	Category		string `binding:"required"`
	Status			string `binding:"required"`
}