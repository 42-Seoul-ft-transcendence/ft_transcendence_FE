#Pull penultimate stable version of alpine
FROM alpine:3.20.3

#Install nginx
RUN apk update && \
	apk add --no-cache \
	nodejs \
	npm \
	git \
	bash
	
RUN mkdir -p /var/lib/my_react
WORKDIR /var/lib/my_react
RUN npm create vite@latest . -- --template react-ts && \
	npm install && \
	npm add react-router-dom && \
	npm install -D tailwindcss@3 postcss autoprefixer && \
	npx tailwindcss init -p && \
	grep -qxF "@tailwind base;" src/index.css || echo -e "\n@tailwind base;\n@tailwind components;\n@tailwind utilities;" >> src/index.css && \
	grep -q "css: {" vite.config.ts || sed -i '/defineConfig({/a\ \ \ css: {\n\ \ \ \ postcss: "./postcss.config.js",\n\ \ }, ' vite.config.ts

CMD ["npm", "run", "dev"]
