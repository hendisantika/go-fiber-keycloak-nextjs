package routes

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"go-fiber-keycloak-nextjs/api/handlers"
	"go-fiber-keycloak-nextjs/api/middlewares"
	"go-fiber-keycloak-nextjs/infrastructure/datastores"
	"go-fiber-keycloak-nextjs/infrastructure/identity"
	"go-fiber-keycloak-nextjs/use_cases/productsuc"
	"go-fiber-keycloak-nextjs/use_cases/usermgmtuc"
)

func InitPublicRoutes(app *fiber.App) {

	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.Send([]byte("Welcome to My Demo Rest API"))
	})

	grp := app.Group("/api/v1")

	identityManager := identity.NewIdentityManager()
	fmt.Println("identityManager --> ", identityManager)
	registerUseCase := usermgmtuc.NewRegisterUseCase(identityManager)

	grp.Post("/users", handlers.RegisterHandler(registerUseCase))
}

func InitProtectedRoutes(app *fiber.App) {

	grp := app.Group("/api/v1")

	productsDataStore := datastores.NewProductsDataStore()

	createProductUseCase := productsuc.NewCreateProductUseCase(productsDataStore)
	grp.Post("/products", middlewares.NewRequiresRealmRole("admin"),
		handlers.CreateProductHandler(createProductUseCase))

	getProductsUseCase := productsuc.NewGetProductsUseCase(productsDataStore)
	grp.Get("/products", middlewares.NewRequiresRealmRole("viewer"),
		handlers.GetProductsHandler(getProductsUseCase))
}
