// swift-tools-version:5.10
// importing the description of a package
import PackageDescription

let package = Package(
    // package name
    name: "hello",
    platforms: [
       .macOS(.v13)
    ],
    dependencies: [
        // 💧 A server-side Swift web framework.
        .package(url: "https://github.com/vapor/vapor.git", from: "4.92.4"),
    ],
    targets: [
        .executableTarget(
            // this is my main Application
            name: "App",
            // what does each target depend on
            dependencies: [
                .product(name: "Vapor", package: "vapor"),
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
