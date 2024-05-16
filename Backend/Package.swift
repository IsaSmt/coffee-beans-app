// swift-tools-version:5.10
// importing the description of a package
import PackageDescription

let package = Package(
    // package name
    name: "CoffeeDatabase",
    platforms: [
       .macOS(.v13)
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.92.4"),
        .package(url: "https://github.com/vapor/fluent.git", from: "4.0.0"), // Fluent package
        .package(url: "https://github.com/vapor/fluent-postgres-driver.git", from: "2.0.0"), //FluentPostgresDriver
    ],
    targets: [
        .executableTarget(
            // this is my main Application
            name: "App",
            // what does each target depend on
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
                .product(name: "Fluent", package: "fluent"), // Fluent dependency
                .product(name: "FluentPostgresDriver", package: "fluent-postgres-driver") //FluentPostgresDriver dependency
            ],
            swiftSettings: swiftSettings
        ),
        .testTarget(
            // this seems to be for unit tests
            name: "AppTests",
            // what does each target depend on
            dependencies: [
                .target(name: "App"),
                .product(name: "XCTVapor", package: "vapor"),
            ],
            swiftSettings: swiftSettings
        )
    ]
)

var swiftSettings: [SwiftSetting] { [
    // used to opt into a future Swift concurrency feature that affects actor type inference
    .enableUpcomingFeature("DisableOutwardActorInference"),
    // enables stricter concurrency checking in Swift
    .enableExperimentalFeature("StrictConcurrency"),
] }
