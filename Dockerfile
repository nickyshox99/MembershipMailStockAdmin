# stage1 as builder
FROM node:16.3.0-alpine as builder

RUN mkdir -p /LoanAdmin
WORKDIR /LoanAdmin
COPY package.json package-lock.json /LoanAdmin/

RUN npm install

# Copy rest of the files
COPY . .

# Build the project
# RUN npm run build


# FROM nginx:alpine as production-build
# # COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
# COPY --from=builder /vueweb/dist /usr/share/nginx/html

EXPOSE 9900
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

CMD npm run serve