package backend

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
	"strings"
)

func initViper() {
	viper.SetConfigName("config")
	viper.SetConfigType("json")
	viper.AddConfigPath(".")
	viper.SetEnvPrefix("demo")
	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("unable to initialize viper: %w", err))
	}
	log.Println("viper config initialized")
}
