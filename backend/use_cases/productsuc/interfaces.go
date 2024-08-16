package productsuc

import (
	"go-fiber-keycloak-nextjs/domain/entities"
)

type ProductsDataStorer interface {
	GetAll() []entities.Product
	Create(product *entities.Product) error
}
