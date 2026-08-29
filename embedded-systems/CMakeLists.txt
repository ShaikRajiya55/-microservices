cmake_minimum_required(VERSION 3.10)
project(NexOS C)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

include_directories(include)

file(GLOB_RECURSE PROD_SOURCES "src/*.c")
file(GLOB_RECURSE TEST_SOURCES "tests/*.c")

add_executable(nexos_app ${PROD_SOURCES})
add_executable(nexos_test_runner ${PROD_SOURCES} ${TEST_SOURCES})
