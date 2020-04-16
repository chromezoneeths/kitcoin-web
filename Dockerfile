FROM nginx
WORKDIR /build
RUN apt update && apt install -y nodejs npm && npm i -g yarn
RUN mkdir build && rm -rf /usr/share/nginx/html
RUN ln -s /build/build /usr/share/nginx/html
COPY . .
RUN yarn