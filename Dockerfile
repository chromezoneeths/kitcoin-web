FROM nginx
WORKDIR /build
RUN apt update && apt install -y nodejs npm
RUN mkdir build && rm -rf /usr/share/nginx/html
RUN ln -s /build/build /usr/share/nginx/html
COPY . .
RUN npm i
RUN npm run-script build