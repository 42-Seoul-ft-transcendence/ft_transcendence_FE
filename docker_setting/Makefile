NAME = main
IMAGE = image
VOLUME = volume
HOST_VOL = srcs

all: main

main:
	mkdir -p $(HOST_VOL)
	docker-compose build
	docker-compose up -d

start:
	docker-compose start

stop:
	docker-compose stop

clean:
	docker-compose down

fclean: clean
	docker rmi -f $(IMAGE)
	docker volume rm -f $(VOLUME)
	docker volume prune -f
	rm -rf $(HOST_VOL)

re: fclean all
