FROM openjdk:21-jdk

ARG JAVA_FILE=target/*.jar
COPY ${JAVA_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]