FROM nginx as base
COPY config/proxy.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

FROM node as build
RUN npm i -g yarn
COPY "src/Portal/Portal.UI" /app
WORKDIR /app
RUN yarn install && yarn build

FROM base as final
COPY --from=build /app/build /app
CMD ["nginx", "-g", "daemon off;"]