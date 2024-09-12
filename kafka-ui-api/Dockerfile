#FROM azul/zulu-openjdk-alpine:17-jre-headless
# FROM azul/zulu-openjdk-alpine@sha256:a36679ac0d28cb835e2a8c00e1e0d95509c6c51c5081c7782b85edb1f37a771a
FROM ibm-semeru-runtimes:open-17-jdk-focal

# RUN apk add --no-cache gcompat # need to make snappy codec work
RUN apt update && apt install libc6 libc6-dev -y
# RUN addgroup kafkaui && useradd -ms -g /bin/bash kafkaui && usermod -aG kafkaui kafkaui && newgrp kafkaui
RUN useradd -ms /bin/bash kafkaui && usermod -aG kafkaui kafkaui && newgrp kafkaui

# creating folder for dynamic config usage (certificates uploads, etc)
RUN mkdir /etc/kafkaui/
RUN chown kafkaui /etc/kafkaui

USER kafkaui

ARG JAR_FILE
COPY "/target/${JAR_FILE}" "/kafka-ui-api.jar"

ENV JAVA_OPTS=

EXPOSE 8080

# see JmxSslSocketFactory docs to understand why add-opens is needed
CMD java --add-opens java.rmi/javax.rmi.ssl=ALL-UNNAMED  $JAVA_OPTS -jar kafka-ui-api.jar
