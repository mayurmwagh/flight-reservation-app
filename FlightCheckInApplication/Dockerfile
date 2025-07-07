# Runtime stage
FROM openjdk:17-slim

# Add labels for better maintainability
LABEL maintainer="Flight Check-In Application Team"
LABEL version="1.0"
LABEL description="Flight Check-In Application"

WORKDIR /app

# Create a non-root user for security
RUN useradd -m -u 1001 appuser
USER appuser

# Copy the jar file from the pipeline build
COPY target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xms512m -Xmx1024m"
ENV SPRING_PROFILES_ACTIVE="prod"

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"] 