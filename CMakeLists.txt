cmake_minimum_required (VERSION 2.6)

project (node-xcomjson)

set(DIST_DIR "${CMAKE_SOURCE_DIR}/bin")
add_subdirectory(external/xcomsave "${CMAKE_CURRENT_BINARY_DIR}/xcomsave_build")

add_custom_target(create_dist ALL DEPENDS ${DIST_DIR})
add_custom_command(OUTPUT ${DIST_DIR}
    COMMAND ${CMAKE_COMMAND} -E make_directory ${DIST_DIR}
)

add_custom_target(copy_xcom2json ALL DEPENDS "${DIST_DIR}/$<TARGET_FILE_NAME:xcom2json>")
add_custom_command(OUTPUT "${DIST_DIR}/xcom2json${CMAKE_EXECUTABLE_SUFFIX}"
    COMMAND ${CMAKE_COMMAND} -E copy "$<TARGET_FILE:xcom2json>" ${DIST_DIR}
    DEPENDS xcom2json create_dist
)

add_custom_target(copy_json2xcom ALL DEPENDS "${DIST_DIR}/$<TARGET_FILE_NAME:json2xcom>")
add_custom_command(OUTPUT "${DIST_DIR}/json2xcom${CMAKE_EXECUTABLE_SUFFIX}"
    COMMAND ${CMAKE_COMMAND} -E copy "$<TARGET_FILE:json2xcom>" ${DIST_DIR}
    DEPENDS json2xcom create_dist
)
