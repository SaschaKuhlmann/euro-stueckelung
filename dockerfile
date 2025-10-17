# ---------- 1. Build Angular frontend ----------
FROM docker.io/library/node:22-alpine AS build-frontend
WORKDIR /app/frontend

# copy Angular sources
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
# build both language variants
RUN npm run build

# ---------- 2. Build Spring Boot backend ----------
FROM docker.io/library/maven:3.9-eclipse-temurin-21 AS build-backend

WORKDIR /app

# copy backend pom and source
COPY backend/pom.xml ./backend/pom.xml
RUN mvn -f backend/pom.xml dependency:go-offline

# copy backend sources
COPY backend ./backend

# copy Angular builds into Spring Boot static folder
COPY --from=build-frontend /app/frontend/dist/frontend/browser/en-US ./backend/src/main/resources/static/en-US
COPY --from=build-frontend /app/frontend/dist/frontend/browser/de ./backend/src/main/resources/static/de

# copy the 3rd party licenses file
COPY --from=build-frontend /app/frontend/dist/frontend/3rdpartylicenses.txt ./backend/src/main/resources/static/

# build the jar
RUN mvn -f backend/pom.xml clean package -DskipTests

# ---------- 3. Final lightweight runtime image ----------
FROM docker.io/library/eclipse-temurin:21-jre-noble
WORKDIR /app

# copy built jar
COPY --from=build-backend /app/backend/target/*.jar app.jar

# expose port 8080
EXPOSE 8080

# run spring boot
ENTRYPOINT ["java","-jar","app.jar"]
