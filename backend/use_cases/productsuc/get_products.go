package productsuc

import (
	"context"
	"go-fiber-keycloak-nextjs/domain/entities"
)

type getProductsUseCase struct {
	dataStore ProductsDataStorer
}

func NewGetProductsUseCase(ds ProductsDataStorer) *getProductsUseCase {
	return &getProductsUseCase{
		dataStore: ds,
	}
}

func (uc *getProductsUseCase) GetProducts(ctx context.Context) []entities.Product {
	all := uc.dataStore.GetAll()
	return all
}
