#include "nexos/protocols/mqtt_client.h"
#include <stdio.h>
#include <assert.h>
int test_protocols(void) { nexos_protocols_mqtt_client_handle_t m; assert(nexos_protocols_mqtt_client_init(&m) == NEXOS_PROTOCOLS_MQTT_CLIENT_STATUS_OK); return 0; }
