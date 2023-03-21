package models

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
)

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
	Title			string
	Content			string
	Category		string
	Status			string
}

func (p PostInput) Validate() error {
	return validation.ValidateStruct(&p,
		validation.Field(&p.Title, validation.Required, validation.Length(20, 0)),
		validation.Field(&p.Content, validation.Required, validation.Length(20, 0)),
		validation.Field(&p.Category, validation.Required, validation.Length(3, 0)),
	)
}