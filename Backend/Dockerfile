# ================================
# Build image
# ================================
FROM swift:5.10-jammy as build

# Install OS updates and any necessary dependencies, such as libjemalloc-dev for memory efficiency optimizations
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
    && apt-get -q update \
    && apt-get -q dist-upgrade -y \
    && apt-get install -y libjemalloc-dev

# Set up a build area
WORKDIR /build

# First just resolve dependencies.
# This creates a cached layer that can be reused
# as long as your Package.swift/Package.resolved
# files do not change.
COPY ./Package.* ./
RUN swift package resolve

# Copy entire repo into the container
COPY . .

# Build everything, with optimizations, and using jemalloc
RUN swift build -c release \
                -Xswiftc -g \
                -Xlinker -ljemalloc

# Switch to the staging area
WORKDIR /staging

# Copy built executable to the staging area
# Use the correct name for your built executable, which is "App"
RUN cp "$(swift build --package-path /build -c release --show-bin-path)/App" ./

# Copy static swift backtracer binary to the staging area
RUN cp "/usr/libexec/swift/linux/swift-backtrace-static" ./

# Copy resources bundled by SPM to the staging area
RUN find -L "$(swift build --package-path /build -c release --show-bin-path)/" -regex '.*\.resources$' -exec cp -Ra {} ./ \;

# Copy contents from the Public directory if it exists
# Ensure that by default, neither the directory nor any of its contents are writable.
RUN [ -d /build/Public ] && { mv /build/Public ./Public && chmod -R a-w ./Public; } || true
RUN [ -d /build/Resources ] && { mv /build/Resources ./Resources && chmod -R a-w ./Resources; } || true

# ================================
# Run image
# ================================
FROM ubuntu:jammy

# Install OS updates and essential system packages
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
    && apt-get -q update \
    && apt-get -q dist-upgrade -y \
    && apt-get -q install -y \
      libjemalloc2 \
      ca-certificates \
      tzdata \
    && rm -r /var/lib/apt/lists/*

# Create a non-root user and group `vapor` to run the app
RUN useradd --user-group --create-home --system --skel /dev/null --home-dir /app vapor

# Switch to the new user's home directory
WORKDIR /app

# Copy built executable and any resources from the build stage to this new directory
COPY --from=build --chown=vapor:vapor /staging /app

# Environment variable for the Swift backtrace
ENV SWIFT_BACKTRACE=1

# Ensure all further commands run as the vapor user
USER vapor:vapor

# Let Docker bind to port 8080
EXPOSE 8080

# Start the Vapor service when the image is run, default to listening on 8080 in the production environment
# The name of the binary is "App"
ENTRYPOINT ["./App"]
CMD ["serve", "--env", "production", "--hostname", "0.0.0.0", "--port", "8080"]
