FROM nginx
WORKDIR /build
RUN mkdir build && rm -rf /usr/share/nginx/html
RUN ln -s /build/build /usr/share/nginx/html
COPY ./build ./build